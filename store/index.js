import axios from 'axios'

export const state = () => ({
    user: [],
    project: [],
    gateways: []
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
    }
}