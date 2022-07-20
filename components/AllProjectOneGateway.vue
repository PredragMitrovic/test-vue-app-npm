<template>
	<div class="row">
		<div class="col-7">
			<template v-for="(reports, projectId, index) in splitProjectReport" >
				<div class="table-wrapper">
					<div class="accordion-wrapper">
						<div class="accordion">
							<input type="radio" name="radio-a" :id="'check' + projectId" checked>
							<label class="accordion-label" :for="'check' + projectId">
								{{ getProjectProperty(projectId, 'name') }}
								<span >
								Total | {{getProjectAmount(reports)}}
								</span>
							</label>
							<div class="accordion-content">
								<div class="table-wrapper">
									<table class="table">
										<tbody>
										<tr>
											<td>Data</td>
											<td>Transaction ID</td>
											<td>Amount</td>
											<td>Gateway</td>
											<td>Project Id</td>
										</tr>
										<tr v-for="(report, index) in reports" :key="index"
										    v-if="gatewayId === report.gatewayId"
										>
											<td>{{report.created}}</td>
											<td>{{report.paymentId}}</td>
											<td>{{report.amount}}</td>
											<td>{{getGatewayProperty(report.gatewayId, 'name')}}</td>
											<td>{{report.projectId}}</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
		<div class="col-5">
			<Doughnut
				:chart-options="getChartData.chartOptions"
				:chart-data="getChartData.chartData"
				:chart-id="chartId"
				:dataset-id-key="datasetIdKey"
				:plugins="plugins"
				:css-classes="cssClasses"
				:styles="styles"
				:width="width"
				:height="height"
			/>
			<h3 class="text-center mt-3">Total amount {{getTotalAmount}}</h3>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	props: {
		gatewayId: {},
		projectId: {},
		chartId: {
			type: String,
			default: 'doughnut-chart'
		},
		datasetIdKey: {
			type: String,
			default: 'label'
		},
		width: {
			type: Number,
			default: 400
		},
		height: {
			type: Number,
			default: 400
		},
		cssClasses: {
			default: '',
			type: String
		},
		styles: {
			type: Object,
			default: () => {}
		},
		plugins: {
			type: Array,
			default: () => []
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
		getChartData() {
			let labels = []
			let colors = []
			let dataset = []
			Object.keys(this.splitProjectReport).forEach(key => {
				labels.push(this.getProjectProperty(key, 'name'))
				colors.push("#" + ((1<<24)*Math.random() | 0).toString(16))
				dataset.push(this.getProjectAmount(this.splitProjectReport[key]))
			});
			return {
				chartData: {
					labels: labels,
					datasets: [
						{
							label: 'Amount',
							backgroundColor: colors,
							data: dataset
						}
					]
				},
				chartOptions: {
					responsive: true,
					maintainAspectRatio: false,
				}
			}
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