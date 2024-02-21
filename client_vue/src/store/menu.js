import { defineStore } from 'pinia'
import { h } from 'vue'
import {
	UserOutlined,
	SettingOutlined,
	SolutionOutlined,
} from '@ant-design/icons-vue';

export const useMenuStore = defineStore("menu", {
	state: () => ({
		selectedKeys: [],
		openKeys: [],
		items: [
			{
				key: 'admin-users',
				icon: () => h(UserOutlined),
				label: 'Users',
				title: 'Users',
				routerName: 'admin-users',
			},
			{
				key: 'admin-settings',
				icon: () => h(SettingOutlined),
				label: 'Settings',
				title: 'Settings',
				routerName: 'admin-settings',
			},
			{
				key: 'admin-roles',
				icon: () => h(SolutionOutlined),
				label: 'Roles',
				title: 'Roles',
				routerName: 'admin-roles',
			},
		],
		count: 0,
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
		increment(payload) {
			this.count += payload;
		}
	},
})