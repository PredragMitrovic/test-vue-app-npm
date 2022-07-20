<template>
	<div>
		<p class="font-weight-bold">All projects | All gateways</p>
		<template v-for="(reports, projectId, index) in splitProjectReport">
			<div class="table-wrapper">
				<div class="accordion-wrapper">
					<div class="accordion">
						<input type="radio" name="radio-a" :id="'check' + projectId" checked>
						<label class="accordion-label" :for="'check' + projectId">{{ getProjectProperty(projectId, 'name') }}
						<span>
							Total | {{getProjectAmount(reports)}}
						</span>
						</label>
						<div class="accordion-content">
							<div class="table-wrapper">
								<table class="table">
									<tbody>
										<tr>
											<td>Data</td>
											<td>Gateway</td>
											<td>Transaction ID</td>
											<td>Amount</td>
										</tr>
										<tr v-for="(report, index) in reports" :key="index">
											<td>{{report.created}}</td>
											<td>{{getGatewayProperty(report.gatewayId, 'name')}}</td>
											<td>{{report.paymentId}}</td>
											<td>{{report.amount}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<h3 class="ml-3">Total: {{getTotalAmount}}</h3>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "AllProjectsAndGateways",
	props: {
		reports: { type: Object },
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

		getTotalAmount() {
			return this.$store.getters.getterReport.data.reduce(function (total, report) {
				return total + report.amount;
			}, 0).toFixed(2);
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