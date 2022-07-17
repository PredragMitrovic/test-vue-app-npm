<template>
	<main>
		<nav class="navbar navbar-light bg-light justify-content-between second-menu">
			<div class="d-block">
				<h2 class="navbar-brand w-100 font-weight-bold mb-0 pb-0">Reports</h2>
				<p class="navbar-brand w-100 mt-0 c-subtitle">Easily generate a report of your transactions</p>
			</div>
			<div class="form-inline">
				<div class="input-group">
					<select class="custom-select button-menu" id="inputGroupSelect04"  @change="onChange()"
					        aria-label="Example select with button addon" v-model="projects">
						<option selected :value="Number(-1)">Select projects</option>
						<option selected :value="Number(0)">All projects</option>
						<option v-for=" project in getterProject" :key="project.projectId" :value="project.projectId">
							{{ project.name }}
						</option>
					</select>
				</div>
				<div class="input-group">
					<select class="custom-select button-menu" id="inputGroupSelect04"  @change="onChange()"
					        aria-label="Example select with button addon" v-model="gateways">
						<option selected :value="Number(-1)">Select gateways</option>
						<option selected :value="Number(0)">All gateways</option>
						<option v-for=" gateways in getterGateways" :key="gateways.gatewayId"
						        :value="gateways.gatewayId">{{ gateways.name }}
						</option>
					</select>
				</div>
				<date-picker placeholder="From data" format="MM/dd/yyyy" v-model="date_from"
				             class="button-menu-datapicker"  @closed="onChange()"/>
				<date-picker placeholder="To data" format="MM/dd/yyyy" v-model="date_to"
				             class="button-menu-datapicker"  @closed="onChange()"/>
				<div class="input-group">
					<button class=" button-menu generate-report">Generate report</button>
				</div>
			</div>
		</nav>
		
		<div class="table-wrapper">
			<project-gateway-table v-if="selectedTemplate === 'ProjectGatewayTable'"
				:projectId="projects"
				:gatewayId="gateways"
				:reports="getterRreport"
			/>
			<all-projects-and-gateways v-if="selectedTemplate === 'AllProjectsAndGateways'"
               :reports="getterRreport"
			/>
			
			<template v-if="projects === 0 && gateways === 0 ">
				<p class="font-weight-bold">All projects | All gateways</p>
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
													<td>Name:</td>
													<td>{{project.name}}</td>
													<td>Rule:</td>
													<td>{{project.rule}}</td>
												</tr>
												<tr>
													<td>Structure:</td>
													<td>{{project.structure}}</td>
													<td>Industry:</td>
													<td>{{project.industry}}</td>
												</tr>
												<tr>
													<td>Website:</td>
													<td>{{project.website}}</td>
													<td>Description:</td>
													<td>{{project.description}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>

			</template>
			<template v-else>
				<template v-for="projectSingle in getterProject" >
					<template v-if="projectSingle.gatewayIds === gateways">
						<table class="table">
							<thead>
							<tr>
								<th scope="col">{{ projectSingle.name }} | Gateway 1</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>Mark</td>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<td>Jacob</td>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
							</tr>
							<tr>
								<td>Larry</td>
								<td>Larry</td>
								<td>the Bird</td>
								<td>@twitter</td>
							</tr>
							<tr>
								<td>Larry</td>
								<td>Larry</td>
								<td>the Bird</td>
								<td>@twitter</td>
							</tr>
							</tbody>
						</table>
					</template>
					<template v-if="projectSingle.projectId === projects && gateways === 0">
						<table class="table">
							<thead>
							<tr>
								<th scope="col">{{ projectSingle.name }} | Gateway all</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>Name:</td>
								<td>{{projectSingle.name}}</td>
								<td>Rule:</td>
								<td>{{projectSingle.rule}}</td>
							</tr>
							<tr>
								<td>Structure:</td>
								<td>{{projectSingle.structure}}</td>
								<td>Industry:</td>
								<td>{{projectSingle.industry}}</td>
							</tr>
							<tr>
								<td>Website:</td>
								<td>{{projectSingle.website}}</td>
								<td>Description:</td>
								<td>{{projectSingle.description}}</td>
							</tr>
							</tbody>
						</table>
					</template>
					
				</template>
				<template v-if="projects === 0 && gateways !== 0 ">
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
															<td>Name:</td>
															<td>{{project.name}}</td>
															<td>Rule:</td>
															<td>{{project.rule}}</td>
														</tr>
														<tr>
															<td>Structure:</td>
															<td>{{project.structure}}</td>
															<td>Industry:</td>
															<td>{{project.industry}}</td>
														</tr>
														<tr>
															<td>Website:</td>
															<td>{{project.website}}</td>
															<td>Description:</td>
															<td>{{project.description}}</td>
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
			</template>
		</div>
	</main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import ProjectGatewayTable from '@/components/ProjectGatewayTable';
import AllProjectsAndGateways from '@/components/AllProjectsAndGateways';

export default {
	components: {ProjectGatewayTable},
	comments: {
		ProjectGatewayTable,
		AllProjectsAndGateways
	},
	props: {
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
			date_from: new Date().setFullYear(new Date().getFullYear() - 2),
			date_to: new Date(),
			projects: -1,
			gateways: -1
		}
	},
	computed: {
		selectedTemplate(){
			let selectedTemplate = ''
			if(this.projects === -1 && this.gateways === -1) {
				// Select project select gateway
				selectedTemplate = 'default'
			} else if(this.projects === 0 && this.gateways === 0) {
				// all projects all gateways
				selectedTemplate = 'AllProjectsAndGateways'
			} else if(this.projects === -1 && this.gateways === 0) {
				// Select project all gateways
				selectedTemplate = 'projectList'
			} else if(this.projects === 0 && this.gateways === -1) {
				// All projects select gateway
				selectedTemplate = 'projectList'
			} else if(typeof this.projects === 'string' && this.projects.length === 5 && this.gateways === 0) {
				// Selected project all gateways
				selectedTemplate = 'projectList'
			} else if(typeof this.projects === 'string' && this.projects.length === 5 && this.gateways === -1) {
				// Selected project select gateway
				selectedTemplate = 'projectList'
			} else if(this.projects === -1 && typeof this.gateways === 'string' && this.gateways.length === 5) {
				// Select project selected gateway
				selectedTemplate = 'projectList'
			} else if(this.projects === 0 && typeof this.gateways === 'string' && this.gateways.length === 5) {
				// All projects selected gateway
				selectedTemplate = 'projectList'
			} else {
				// Selected project selected gateway
				selectedTemplate ='ProjectGatewayTable'
			}
			return selectedTemplate
		},
		...mapGetters([
			'getterProject',
			'getterGateways',
			'getterRreport'
		])
	},
	methods: {
		async onChange() {
			let payload = {
				"from": new Date(this.date_from).toISOString().split('T')[0],
				"to": new Date(this.date_to).toISOString().split('T')[0],
			}
			if (![-1, 0].includes(this.projects)){
				payload.projectId = this.projects
			}
			if (![-1, 0].includes(this.gateways)){
				payload.gatewayId = this.gateways
			}
			await this.CREATE_REPORT(payload);
		},

		...mapActions([
			'GET_PROJECT',
			'GET_GATEWAYS',
			'CREATE_REPORT'
		])
	},
	created() {
		this.GET_PROJECT();
		this.GET_GATEWAYS();
	}
};

</script>

