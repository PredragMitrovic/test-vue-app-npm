<template>
	<div class="row">
		<div class="col-7">
			<template v-for="project in getterProject" >
				<div class="table-wrapper">
					<div class="accordion-wrapper">
						<div class="accordion">
							<input type="radio" name="radio-a" :id="'check' + project.projectId" checked>
							<label class="accordion-label" :for="'check' + project.projectId">{{ project.name }}</label>
							<div class="accordion-content">
								<div class="table-wrapper">
									<table class="table">
										<tbody>
										<tr>
											<td>Data</td>
											<td>Transaction ID</td>
											<td>Amount</td>
										</tr>
										<tr v-for="(report, index) in reports.data" :key="index">
											<td>{{report.created}}</td>
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
		</div>
		<div class="col-5">
			<Doughnut
				:chart-options="chartOptions"
				:chart-data="chartData"
				:chart-id="chartId"
				:dataset-id-key="datasetIdKey"
				:plugins="plugins"
				:css-classes="cssClasses"
				:styles="styles"
				:width="width"
				:height="height"
			/>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "AllProjectsAndGateways",
	props: {
		reports: { type: Object },
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
	data() {
		return {
			chartData: {
				labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: ['#A259FF', '#6497B1', '#FFC107', '#F24E1E'],
						data: [60, 10, 15, 15]
					}
				]
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
			},
		}
	},
	methods: {
		...mapActions([
			'GET_PROJECT',
			'GET_GATEWAYS'
		])
	},
	
	computed: {
		...mapGetters([
			'getterProject',
			'getterGateways'
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