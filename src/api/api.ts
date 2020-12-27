
import { PhotosType, ProfileType, UserType } from './../types/types';
import  axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "b95e0418-d517-400a-8f28-f765dd31353f",
  },
});



export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instance
      .get<GetItemType>(`users?page=${currentPage}&count=${pageSize}`);
    return response.data;
  },
  follow(userId:number) {
    return instance.post<ResponseType>(`follow/${userId}`)
  },
  unfollow(userId:number) {
    return instance.delete<ResponseType>(`follow/${userId}`)
  },
  getProfile(userId:number) {
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  async getProfile(userId:number) {
    const res = await instance.get<ProfileType>(`profile/` + userId);
  return res.data
  },
  async getStatus(userId:number) {
    const res = await instance.get<string>(`profile/status/` + userId);
    return res.data;
  },
  async updateStatus(status:string) {
    const res = await instance.put<UpdateResponseStatus>(`profile/status`, { status: status });
     return res.data
  },
   async savePhoto(photoFile:File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    const res = await instance.put<ResponseType<ResponseSavePhoto>>(`profile/photo`, formData, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     });
     return res.data;
  },
  saveProfile(profile:ProfileType) {
    return instance.put<ResponseType>(`profile`, profile);
  },
};

export const authAPI = {
  async me() {
    const res = await instance.get<ResponseType<MeResponseType>>(`auth/me`);
    return res.data;
  },
  async login(email:string, password:string, rememberMe = false, captcha:null | string = null ) {
    const res = await instance.post<ResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptcha >>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return res.data;
  },
  async logout() {
    const res = await instance.delete<LogoutResponseType>(`auth/login`);
    return res.data;
  },
};

export const securityAPI = {
 async getCaptchaUrl() {
    const res = await instance.get<GetCaptchaUrlResponse>(`security/get-captcha-url`);
  return res.data
  },
};

type ResponseType <D={}, R=ResultCodeEnum> = {
  data:D
  resultCode:R
  messages:Array<string>
  }

export enum ResultCodeEnum{
  Success = 0,
  Error = 1,
  }
  export enum ResultCodeForCaptcha{
    captchaIsRequired = 10
    }
  type MeResponseType = {
    id:number
    email:string
    login:string
  }
  type LoginResponseType = {
    userId:number
  }
  type LogoutResponseType = {
    resultCode:ResultCodeEnum
    messages:Array<string>
    data:{}
  }
  
  type GetItemType = {
    items:Array<UserType>
    totalCount:number
    error: string | null
  }
    
  
  type UpdateResponseStatus = {
    data:{
      resultCode:ResultCodeEnum
    }
  }
  
  type ResponseSavePhoto = {
    photos:PhotosType
  }

type GetCaptchaUrlResponse = {
  url:string
}