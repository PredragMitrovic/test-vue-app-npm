<template>
	<main>
		<nav class="navbar navbar-light bg-light justify-content-between second-menu p-0">
			<div class="row m-0 p-0 w-100">
				<div class="col-3">
					<div class="d-block">
						<h2 class="navbar-brand w-100 font-weight-bold mb-0 pb-0">Reports</h2>
						<p class="navbar-brand w-100 mt-0 c-subtitle">Easily generate a report of your transactions</p>
					</div>
				</div>
				<div class="col-9">
					<div class="form-inline float-right">
						<div class="input-group">
							<select class="custom-select button-menu" id="inputGroupSelect04"  @change="onChange()"
							        aria-label="Example select with button addon" v-model="projectId">
								<option selected :value="Number(-1)">Select projects</option>
								<option selected :value="Number(0)">All projects</option>
								<option v-for=" project in getterProject" :key="project.projectId" :value="project.projectId">
									{{ project.name }}
								</option>
							</select>
						</div>
						<div class="input-group">
							<select class="custom-select button-menu" id="inputGroupSelect04"  @change="onChange()"
							        aria-label="Example select with button addon" v-model="gatewayId">
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
				</div>
			</div>
			
		</nav>
		
		<div class="table-wrapper">
			<component
				:is="selectedTemplate"
				:projectId="projectId"
				:gatewayId="gatewayId"
			></component>
		</div>
	</main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import ProjectGatewayTable from '@/components/ProjectGatewayTable';
import AllProjectsAndGateways from '@/components/AllProjectsAndGateways';
import AllProjectOneGateway from '@/components/AllProjectOneGateway';
import OneProjectAllGateways from '@/components/OneProjectAllGateways';
import Default from '@/components/Default';

export default {
	components: {ProjectGatewayTable},
	comments: {
		ProjectGatewayTable,
		AllProjectsAndGateways,
		AllProjectOneGateway,
		OneProjectAllGateways,
		Default
	},

	data() {
		return {
			date_from: new Date().setFullYear(new Date().getFullYear() - 2),
			date_to: new Date(),
			projectId: -1,
			gatewayId: -1
		}
	},
	computed: {
		selectedTemplate(){
			let selectedTemplate = ''
			if(this.projectId === -1 && this.gatewayId === -1) {
				// Select project select gateway
				selectedTemplate = 'Default'
			} else if(this.projectId === 0 && this.gatewayId === 0) {
				// all projects all gateways
				selectedTemplate = 'AllProjectsAndGateways'
			} else if(this.projectId === -1 && this.gatewayId === 0) {
				// Select project all gateways
				selectedTemplate = 'Default'
			} else if(this.projectId === 0 && this.gatewayId === -1) {
				// All projects select gateway
				selectedTemplate = 'Default'
			} else if(typeof this.projectId === 'string' && this.projectId.length === 5 && this.gatewayId === 0) {
				// Selected project all gateways
				selectedTemplate = 'OneProjectAllGateways'
			} else if(typeof this.projectId === 'string' && this.projectId.length === 5 && this.gatewayId === -1) {
				// Selected project select gateway
				selectedTemplate = 'Default'
			} else if(this.projectId === -1 && typeof this.gatewayId === 'string' && this.gatewayId.length === 5) {
				// Select project selected gateway
				selectedTemplate = 'Default'
			} else if(this.projectId === 0 && typeof this.gatewayId === 'string' && this.gatewayId.length === 5) {
				// All projects selected gateway
				selectedTemplate = 'AllProjectOneGateway'
			} else {
				// Selected project selected gateway
				selectedTemplate ='ProjectGatewayTable'
			}
			return selectedTemplate
		},
		...mapGetters([
			'getterProject',
			'getterGateways',
			'getterReport'
		])
	},
	methods: {
		async onChange() {
			const defaultValues = [-1, 0]
			let payload = {
				"from": new Date(this.date_from).toISOString().split('T')[0],
				"to": new Date(this.date_to).toISOString().split('T')[0],
			}
			if (!defaultValues.includes(this.projectId)){
				payload.projectId = this.projectId
			}
			if (!defaultValues.includes(this.gatewayId)){
				payload.gatewayId = this.gatewayId
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

