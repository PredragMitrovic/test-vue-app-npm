<template>
		<table class="table">
			<thead>
			<tr>
				<th scope="col">{{ getProjectProperty(projectId, 'name') }} |
					<template v-if="gatewayId !==0 && gatewayId !== -1">{{ getGatewayProperty(gatewayId, 'name') }}</template>
					<template v-if="gatewayId === 0 ">All gateways</template>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>Data</td>
				<td>Transaction ID</td>
				<td>Amount</td>
			</tr>
			<tr v-for="(report, index) in getterRreport.data" :key="index">
				<td>{{report.created}}</td>
				<td>{{report.paymentId}}</td>
				<td>{{report.amount}}</td>
			</tr>
			</tbody>
		</table>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
	name: "ProjectGatewayTable",
	props: {
		projectId: {},
		gatewayId: {}
	},
	methods: {
		getProjectProperty(projectId, property) {
			let project = this.$store.getters.getterProject.find((item) => {
				return item.projectId === projectId
			})
			return project[property]
		},
		getGatewayProperty(gatewayId, property) {
			let gateway = this.$store.getters.getterGateways.find((item) => {
				return item.gatewayId === gatewayId
			})
			return gateway[property]
		},
		...mapActions([
			'GET_PROJECT',
			'GET_GATEWAYS'
		])
	},
	
	computed: {
		...mapGetters([
			'getterProject',
			'getterGateways',
			'getterRreport'
		])
	},
	
	created() {
		this.GET_PROJECT();
		this.GET_GATEWAYS();
	}
	
}
</script>

<style scoped>

</style>