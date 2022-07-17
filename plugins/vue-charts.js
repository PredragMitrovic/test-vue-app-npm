import Vue from 'vue'
import Chart from 'chart.js/auto';

import { Doughnut } from 'vue-chartjs/legacy'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

Vue.component('Doughnut', Doughnut)