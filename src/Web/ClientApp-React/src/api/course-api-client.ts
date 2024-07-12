import followIfLoginRedirect from "../components/api-authorization/followIfLoginRedirect";

export class CourseServiceClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.http = http ? http : (window as any);
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  getAllCourses(): Promise<Course[]> {
    let url_ = this.baseUrl + "/api/Courses";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processGetAllCourses(_response);
    });
  }

  protected processGetAllCourses(response: Response): Promise<Course[]> {
    followIfLoginRedirect(response);
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200) result200!.push(Course.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        //console.error(_responseText);
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<Course[]>(null as any);
  }

  createNewCourse(command: CreateCourseCommand): Promise<number> {
    let url_ = this.baseUrl + "/api/Courses";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(command);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processCreateNewCourse(_response);
    });
  }

  protected processCreateNewCourse(response: Response): Promise<number> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200 || status === 201) {
      return response.text().then((_responseText) => {
        let result: number = 0;
        let resultData =
          _responseText === "" ? null : JSON.parse(_responseText);
        result = resultData !== undefined ? resultData : <any>null;
        return result;
      });
    } else {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
  }
}

class CreateCourseCommand implements ICreateCourseCommand {
  courseId: number;
  courseName: string | undefined;
  description?: string | undefined;
  credits: number;
  category: number;

  constructor(data?: ICreateCourseCommand) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.courseId = Number(_data["courseId"]);
      this.courseName = _data["courseName"];
      this.description = _data["description"];
      this.credits = Number(_data["credits"]);
      this.category = Number(_data["category"]);
    }
  }

  static fromJS(data: any): CreateCourseCommand {
    data = typeof data === "object" ? data : {};
    let result = new CreateCourseCommand();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["courseId"] = this.courseId;
    data["courseName"] = this.courseName;
    data["description"] = this.description;
    data["credits"] = this.credits;
    data["category"] = this.category;
    return data;
  }
}

export interface ICreateCourseCommand {
  courseId: number;
  courseName: string | undefined;
  description?: string | undefined;
  credits: number;
  category: CourseCategoryEnum;
}

export enum CourseCategoryEnum {
  undergraduate = 1,
  postgraduate = 2,
  certificate = 3,
  diploma = 4,
}

export class Course {
  id?: number;
  courseId: number;
  courseName: string | undefined;
  description?: string | undefined;
  credits: number;
  category: number;

  constructor(data?: Partial<Course>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static fromJS(data: any): Course {
    return new Course({
      id: data.id,
      courseId: data.courseId,
      courseName: data.courseName,
      description: data.description,
      credits: data.credits,
      category: data.category,
    });
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  if (result !== null && result !== undefined) throw result;
  else throw new SwaggerException(message, status, response, headers, null);
}

export class SwaggerException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isSwaggerException = true;

  static isSwaggerException(obj: any): obj is SwaggerException {
    return obj.isSwaggerException === true;
  }
}
