import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { config } from '../config/config.js'

class HttpService {
  private service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: config.BASE_URL
    })
  }
  public async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.service.get(url)
    return response.data
  }
}

export default HttpService
