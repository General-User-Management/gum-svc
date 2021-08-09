### gum-svc
权限的系统对策略的执行，封装 casbin 开源组件；对外提供权限的 CURD 操作以及；

#### API列表
1. 给角色增加一个api权限
```
{
    "method":"addPolicy",
    "args":["机构管理员","api/v1/users","DELETE"]
}
```
2. 批量增加p域
```
{
    "method":"addPolicies",
    "args":[
        [
            [
                "机构管理员",
                "api/v1/users",
                "(GET)|(POST)|(PUT)|(PATCH)|(DELETE)"
            ],
            [
                "机构管理员",
                "api/v1/user",
                "GET"
            ],
            [
                "机构管理员",
                "api/v1/role/*",
                "GET"
            ],
            [
                "机构管理员",
                "api/v1/school/:schoolid/teacher/:teacherid",
                "POST"
            ]
        ]
    ]
}
```
3. 给用户赋予某个角色
```
{
    "method":"getImplicitPermissionsForUser",
    "args":["hyx"]
}
```
4. 获取角色拥有的权限
```
{
    "method":"getFilteredNamedPolicy",
    "args":["p",0,"机构管理员"]
}
```
5. 获取用户拥有的角色
```

{
    "method":"getImplicitRolesForUser",
    "args":["ypj"]
}
// 或者
{
    "method":"getRolesForUser",
    "args":["hyx"]
}
```
6. 获取角色拥有的用户
```
{
    "method":"getUsersForRole",
    "args":["机构管理员"]
}
```
7. 获取所有的实体
```
{
    "method":"getAllSubjects",
    "args":[]
}
```
8. 获取所有的资源列表
```
{
    "method":"getAllObjects",
    "args":[]
}
```
9. 获取所有的行为
```
{
    "method":"getAllActions",
    "args":[]
}
```
10. 获取所有的角色
```
{
    "method":"getAllRoles",
    "args":[]
}
```
11. 获取所有的策略列表
```
{
    "method":"getPolicy",
    "args":[]
}
```
12. 查询用户分配给了那些角色
```
{
    "method":"getFilteredNamedGroupingPolicy",
    "args":["g",0,"hyx"]
}
```
13. 批量移除角色权限
```
{
    "method":"removeNamedPolicies",
    "args":["p",[   
        ['jack', 'data4', 'read'],
        ['katy', 'data4', 'write'],
        ['leyo', 'data4', 'read'],
        ['ham', 'data4', 'write']
        ]
    ]
}
```
14. 移除某个用户有用的某个角色
```
{
    "method":"deleteRoleForUser",
    "args":["testuser","测试角色"]
}
```
