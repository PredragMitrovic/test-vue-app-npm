import axios from 'axios'

export const state = () => ({
    user: [],
    project: [],
    gateways: [],
    reports: [],
})

export const getters = {
    getterUser: state => {
        return state.user
    },
    getterProject: state => {
        return state.project
    },
    getterGateways: state => {
        return state.gateways
    },
    getterRreport: state => {
        return state.reports
    }
}

export const mutations = {
    updateUser: (state, data) => {
        state.user = data
    },
    updateProject: (state, data) => {
        state.project = data
    },
    updateGateways: (state, data) => {
        state.gateways = data
    },
    ADD_REPORT: (state, data) => {
        state.reports = data
    },
}

export const actions = {
    async GET_USER(context,data) {
        const callData = await axios.get('http://178.63.13.157:8090/mock-api/api/users')
        const users = callData.data
        context.commit('updateUser', users.data)
    },
    async GET_PROJECT(context,data) {
        const callData = await axios.get('http://178.63.13.157:8090/mock-api/api/projects')
        const users = callData.data
        context.commit('updateProject', users.data)
    },
    async GET_GATEWAYS(context,data) {
        const callData = await axios.get('http://178.63.13.157:8090/mock-api/api/gateways')
        const users = callData.data
        context.commit('updateGateways', users.data)
    },

    async CREATE_REPORT(context, data) {
        const callDataCreated = await axios.post('http://178.63.13.157:8090/mock-api/api/report', data)
        context.commit('ADD_REPORT', callDataCreated.data)
    },
}