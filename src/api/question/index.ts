import { request } from "@/utils/service"
import type * as Question from "./types/table"

/** 增 */
export function createQuestionDataApi(data: Question.CreateQuestionRequestData) {
  return request({
    url: "question/addQuestion",
    method: "post",
    data
  })
}

/** 删 */
export function deleteQuestionDataApi(id: string) {
  return request({
    url: `question/deleteQuestion/?questionId=` + id,
    method: "get"
  })
}

/** 改 */
export function updateQuestionDataApi(data: Question.UpdateQuestionRequestData) {
  return request({
    url: "question/updateQuestion",
    method: "post",
    data
  })
}

/** 查 */
export function getQuestionDataApi(data, params: Question.GetQuestionRequestData) {
  return request<Question.GetQuestionResponseData>({
    url: `question/getQuestionPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getQuestionInfoApi(params: Question.GetQuestionRequestData) {
  return request<Question.GetQuestionResponseData>({
    url: `question/getQuestionInfo?questionId=${params}`,
    method: "get" // 使用POST请求
  })
}
