import request from '@/utils/request'
export const getcitylist = (level) => {
  return request({
    url: '/area/city',
    params: { level }
  })
}
