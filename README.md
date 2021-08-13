## gum-svc
权限的系统对策略的执行，封装 casbin 开源组件；对外提供权限的 CURD 操作以及；

### API列表
<details>
  <summary>1. 给角色增加一个api权限</summary>
  <pre><code>
    {
        "method":"addPolicy",
        "args":["机构管理员","api/v1/users","DELETE"]
    }
</code></pre>
</details>

<details>
  <summary>2. 批量增加p域</summary>
  <pre><code>
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
</code></pre>
</details>

<details>
  <summary>3. 给用户赋予某个角色</summary>
  <pre><code>
    {
        "method":"addRoleForUser",
        "args":["hyx","机构管理员"]
    }
</code></pre>
</details>

<details>
  <summary>4. 获取到用户拥有的权限</summary>
  <pre><code>
    {
        "method":"getImplicitPermissionsForUser",
        "args":["hyx"]
    }
</code></pre>
</details>

<details>
  <summary>5. 获取角色拥有的权限</summary>
  <pre><code>
    {
        "method":"getFilteredNamedPolicy",
        "args":["p",0,"机构管理员"]
    }
</code></pre>
</details>

<details>
  <summary>6. 获取用户拥有的角色</summary>
  <pre><code>
    {
        "method":"getImplicitRolesForUser",
        "args":["ypj"]
    }
    // 或者
    {
        "method":"getRolesForUser",
        "args":["hyx"]
    }
</code></pre>
</details>

<details>
  <summary>7. 获取角色拥有的用户</summary>
  <pre><code>
    {
        "method":"getUsersForRole",
        "args":["机构管理员"]
    }
</code></pre>
</details>

<details>
  <summary>8. 获取所有的实体</summary>
  <pre><code>
    {
        "method":"getAllSubjects",
        "args":[]
    }
</code></pre>
</details>

<details>
  <summary>9. 获取所有的资源列表</summary>
  <pre><code>
    {
        "method":"getAllObjects",
        "args":[]
    }
</code></pre>
</details>

<details>
  <summary>10. 获取所有的行为</summary>
  <pre><code>
    {
        "method":"getAllActions",
        "args":[]
    }
</code></pre>
</details>

<details>
  <summary>11. 获取所有的角色</summary>
  <pre><code>
    {
        "method":"getAllRoles",
        "args":[]
    }
</code></pre>
</details>

<details>
  <summary>12. 获取所有的策略列表</summary>
  <pre><code>
    {
        "method":"getPolicy",
        "args":[]
    }
</code></pre>
</details>

<details>
  <summary>13. 查询用户分配给了那些角色</summary>
  <pre><code>
    {
        "method":"getFilteredNamedGroupingPolicy",
        "args":["g",0,"hyx"]
    }
</code></pre>
</details>

<details>
  <summary>14. 批量移除角色权限</summary>
  <pre><code>
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
</code></pre>
</details>

<details>
  <summary>15. 移除某个用户有用的某个角色</summary>
  <pre><code>
    {
        "method":"deleteRoleForUser",
        "args":["testuser","测试角色"]
    }
</code></pre>
</details>
