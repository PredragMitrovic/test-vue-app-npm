<template>
	<div>
		<template  >
			<h3 class="float-right">
				Total | {{getProjectAmount(getterReport.data)}}
			</h3>
		</template>
		<table class="table">
			<thead>
			<tr>
				<th scope="col">{{ getProjectProperty(projectId, 'name') }} | {{projectId}}
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
				<td>Project Id</td>
				<td>Gateway Id</td>
			</tr>
			<tr v-for="(report, index) in getterReport.data" :key="index">
				<td>{{report.created}} {{report.projectId}} {{report.gatewayId}}</td>
				<td>{{report.paymentId}}</td>
				<td>{{report.amount}}</td>
				<td>{{report.projectId}}</td>
				<td>{{report.gatewayId}}</td>
			</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
	name: "ProjectGatewayTable",
	props: {
		projectId: {},
		gatewayId: {}
	},
	data() {
		return {
			total: 0
		}
	},
	methods: {
		getProjectAmount(project) {
			return project.reduce(function (total, report) {
				return total + report.amount;
			}, 0).toFixed(2);
		},
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
		splitProjectReport() {
			return this.$store.getters.getterReport.data.reduce( (acc, obj) => {
				acc[obj.projectId] = acc[obj.projectId] || [];
				acc[obj.projectId].push(obj);
				return acc;
			}, {});
		},
		...mapGetters([
			'getterProject',
			'getterGateways',
			'getterReport'
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