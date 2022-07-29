# 登录模块
登录模块使用 [supabase](https://supabase.com)提供的baas服务构建。
## 获取用户信息
可以通过session()函数获取token，token可用于向github发送请求。
```
const session = supabase.auth.session()

```
session包含如下信息
```json
{
    "provider_token": "...",
    "access_token": "...",
    "expires_in": 3600,
    "expires_at": 1659101941,
    "refresh_token": "0JcxfnY2IsFu_AiV5ClBZg",
    "token_type": "bearer",
    "user": {
        ...
    }
}
```
也通过user()函数获取用户信息
```
const user = supabase.auth.user()
```
获取到的用户信息如下，其中的id是用户的唯一标识。
```json
{
    "id": "a909b2cb-cd98-4e14-8d12-a94de8ade1cc",
    "aud": "authenticated",
    "role": "authenticated",
    "email": "841298391cp@gmail.com",
    "email_confirmed_at": "2022-07-28T16:30:58.444232Z",
    "phone": "",
    "confirmed_at": "2022-07-28T16:30:58.444232Z",
    "last_sign_in_at": "2022-07-29T12:27:39.530272Z",
    "app_metadata": {
        "provider": "github",
        "providers": [
            "github"
        ]
    },
    "user_metadata": {
        "avatar_url": "https://avatars.githubusercontent.com/u/56476336?v=4",
        "email": "841298391cp@gmail.com",
        "email_verified": true,
        "full_name": "vecpeng",
        "iss": "https://api.github.com",
        "name": "vecpeng",
        "preferred_username": "vecpeng",
        "provider_id": "56476336",
        "sub": "56476336",
        "user_name": "vecpeng"
    },
    "identities": [
        {
            "id": "56476336",
            "user_id": "a909b2cb-cd98-4e14-8d12-a94de8ade1cc",
            "identity_data": {
                "avatar_url": "https://avatars.githubusercontent.com/u/56476336?v=4",
                "email": "841298391cp@gmail.com",
                "email_verified": true,
                "full_name": "vecpeng",
                "iss": "https://api.github.com",
                "name": "vecpeng",
                "preferred_username": "vecpeng",
                "provider_id": "56476336",
                "sub": "56476336",
                "user_name": "vecpeng"
            },
            "provider": "github",
            "last_sign_in_at": "2022-07-28T16:30:58.438285Z",
            "created_at": "2022-07-28T16:30:58.438343Z",
            "updated_at": "2022-07-29T12:27:39.526339Z"
        }
    ],
    "created_at": "2022-07-28T16:30:58.431998Z",
    "updated_at": "2022-07-29T12:27:39.532774Z"
}
```
## 监听用户状态
用户登录或者登出时可以使用onAuthStateChange()函数监听
```
supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
})
```
更多更详细的信息可以查看[supabase的文档](https://supabase.com/docs/reference)。