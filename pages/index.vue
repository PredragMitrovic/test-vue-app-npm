<template>
	<main>
		<nav class="navbar navbar-light bg-light justify-content-between second-menu">
			<div class="d-block">
				<h2 class="navbar-brand w-100 font-weight-bold mb-0 pb-0">Reports</h2>
				<p class="navbar-brand w-100 mt-0 c-subtitle">Easily generate a report of your transactions</p>
			</div>
			<div class="form-inline">
				<div class="input-group">
					<select class="custom-select button-menu" id="inputGroupSelect04"
					        aria-label="Example select with button addon" v-model="projects">
						<option selected :value="Number(0)">All projects</option>
						<option v-for=" project in getterProject" :key="project.projectId" :value="project.projectId">
							{{ project.name }}
						</option>
					</select>
				</div>
				<div class="input-group">
					<select class="custom-select button-menu" id="inputGroupSelect04"
					        aria-label="Example select with button addon" v-model="gateways">
						<option selected :value="Number(0)">All gateways</option>
						<option v-for=" gateways in getterGateways" :key="gateways.gatewayId"
						        :value="gateways.gatewayId">{{ gateways.name }}
						</option>
					</select>
				</div>
				<date-picker placeholder="From data" format="MM/dd/yyyy" v-model="date_from"
				             class="button-menu-datapicker"/>
				<date-picker placeholder="To data" format="MM/dd/yyyy" v-model="date_to"
				             class="button-menu-datapicker"/>
				<div class="input-group">
					<button class=" button-menu generate-report">Generate report</button>
				</div>
			</div>
		</nav>
		
		<div class="table-wrapper">
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
				<h1 v-if="getterProject.gatewayIds !== gateways && gateways !== 0" >There is no project to match the gateway!</h1>
			</template>
		</div>
		
		<form @submit.prevent="addReport">
			<button type="submit"> Submit new user </button>
		</form>
		<div>
			{{getterRreport}}
		</div>
	</main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {
	components: {},
	data() {
		return {
			date_from: new Date(),
			date_to: new Date(),
			projects: 0,
			gateways: 0,
			dataPostSet: {
				"from": '',
				"to": '',
				"projectId": '',
				"gatewayId": '',
			}
		}
	},
	computed: {
		...mapGetters([
			'getterProject',
			'getterGateways',
			'getterRreport'
		])
	},
	methods: {
		async addReport(){
			await this.CREATE_REPORT(this.dataPostSet);
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

