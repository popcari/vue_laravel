const routes = [
	{
		path: '/admin',
		component: () => import('../layout/Admin.vue'),
		children: [
			{
				path: "users",
				name: "admin-users",
				component: () => import('../pages/admin/users/index.vue')
			}
		]
	}
]

export default routes;