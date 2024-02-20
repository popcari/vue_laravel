import { defineStore } from 'pinia'
import { h } from 'vue'
import {
	UserOutlined,
	SettingOutlined,
	SolutionOutlined,
} from '@ant-design/icons-vue';

export const useMenuStore = defineStore("menu", {
	state: () => ({
		selectedKeys: ["1"],
		openKeys: [],
		items: [
			{
				key: '1',
				icon: () => h(UserOutlined),
				label: 'Users',
				title: 'Users',
				routerName: 'admin-users',
			},
			{
				key: '2',
				icon: () => h(SettingOutlined),
				label: 'Settings',
				title: 'Settings',
				routerName: 'admin-settings',
			},
			{
				key: '3',
				icon: () => h(SolutionOutlined),
				label: 'Roles',
				title: 'Roles',
				routerName: 'admin-roles',
			},
		],
	}),
	getters: {

	},
	actions: {
		setSelectedKeys(payload) {
			this.selectedKeys = payload;
		},

		setOpenKeys(payload) {
			this.openKeys = payload;
		},
	},
})