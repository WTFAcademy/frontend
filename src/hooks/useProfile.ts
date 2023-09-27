import { getProfile } from "@site/src/api/user";
import { useQuery } from "react-query";

const useProfile = (
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg3MDk1NDc0LCJzdWIiOiJkZWI2NDA1Mi1lYzU5LTRlYmYtYmIwNi05MjVlYTQxYThiYmMiLCJlbWFpbCI6ImRqYW5nb29tb0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImdpdGh1YiIsInByb3ZpZGVycyI6WyJnaXRodWIiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xMTEyMzA1NzM_dj00IiwiZW1haWwiOiJkamFuZ29vbW9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkRqYW5nbyIsImlzcyI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20iLCJuYW1lIjoiRGphbmdvIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMHhEamFuZ29NbyIsInByb3ZpZGVyX2lkIjoiMTExMjMwNTczIiwic3ViIjoiMTExMjMwNTczIiwidXNlcl9uYW1lIjoiMHhEamFuZ29NbyJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNjg3MDkxODc0fV0sInNlc3Npb25faWQiOiIyZGViZTE3ZC0zYjlmLTQ5ZDMtOTg0OC1iMDA2NWZmNmVkYWIifQ.mMRCwMayHBt3qEYQ9u70iywfvErihk6InOkxDzjuWTU",
) => {
  const isLogin = true;

  const { data, isLoading, isError } = useQuery(
    ["profile", token],
    () => getProfile(token),
    {
      enabled: isLogin,
    },
  );

  return {
    profile: data,
  };
};

export default useProfile;
