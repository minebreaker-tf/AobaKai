import Vue = require('vue');
import { informationIcon, closeIcon } from './icons/icons'

interface NotificationData extends Vue {
    show: boolean,
    notification: string
}

const notification: Vue.ComponentOptions<NotificationData> = {
    name: 'notification',
    props: ['notification'],
    template: `
    <div class="notification" v-if="show && notification">
        <information-icon size="24" clazz="notification-icon"></information-icon>
        <p class="inlined">{{ notification }}</p>
        <div class="inlined cursor-pointer pull-right" v-on:click="hide()">
            <close-icon size="24" clazz="notification-icon"></close-icon>        
        </div>
    </div>`,
    data: () => {
        return {
            show: true
        }
    },
    methods: {
        hide: function () {
            this.show = false;
        }
    },
    components: {
        informationIcon,
        closeIcon
    }
};

export default notification;
