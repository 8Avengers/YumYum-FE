import instance from "apis/instance";
import { useQuery } from "react-query";

/** 팔로잉한 유저들 포스팅 조회 */
const GetMap = (type) => {
  return useQuery(["map", type], async () => {
    const response = await instance.get(`map/following-posting?type=${type}`);
    return response.data;
  });
};

/** 팔로잉한 유저들 포스팅 리스트 조회 */
const GetMapList = () => {
  return useQuery(["mapList"], async () => {
    const response = await instance.get("map/follower-posting-list");
    return response.data;
  });
};

const MapService = { GetMap, GetMapList };

export default MapService;
