
import { ProfileType } from './../types/types';
import  axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "b95e0418-d517-400a-8f28-f765dd31353f",
  },
});

type FollowType = {
  resultCode:ResultCodeEnum
  messages:Array<string>
  data:{}
}
type UnfollowType = {
  resultCode:ResultCodeEnum
  messages:Array<string>
  data:{}
}

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instance
      .get(`users?page=${currentPage}&count=${pageSize}`);
    return response.data;
  },
  follow(userId:number) {
    return instance.post<FollowType>(`follow/${userId}`)
  },
  unfollow(userId:number) {
    return instance.delete<UnfollowType>(`follow/${userId}`)
  },
  getProfile(userId:number) {
    console.warn("Obsolete method. Please profileAPI object.");
    return profileAPI.getProfile(userId);
  },
};
export enum ResultCodeEnum{
Success = 0,
Error = 1,
}
export enum ResultCodeForCaptcha{
  captchaIsRequired = 10
  }
type MeResponseType = {
  data:{id:number, email:string, login:string}
  resultCode:ResultCodeEnum
  messages:Array<string>
}
type LoginResponseType = {
  resultCode:ResultCodeEnum | ResultCodeForCaptcha
  messages:Array<string>
  data:{userId:number}
}
type LogoutResponseType = {
  resultCode:ResultCodeEnum
  messages:Array<string>
  data:{}
}

export const profileAPI = {
  getProfile(userId:number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId:number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status:string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile:any) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile:ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export const authAPI = {
  async me() {
    const res = await instance.get<MeResponseType>(`auth/me`);
    return res.data;
  },
  async login(email:string, password:string, rememberMe = false, captcha:null | string = null ) {
    const res = await instance.post<LoginResponseType>(`auth/login`, {
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
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
