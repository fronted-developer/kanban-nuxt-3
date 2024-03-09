interface User {
    name: String,
    email: String,
    id: String,
    status: Boolean
}

const initialState: { user: User } = {
	user: {
		name: '',
		email: '',
		id: '',
		status: false,
	},
}


export const useAuthStore = defineStore('auth', {
    state: () => initialState,
    getters: {
        currentUser: state => state.user
    },
    actions: {
        set(user: User) {
            this.$patch({user})
        },
        clear(){
            this.$patch(initialState)
        }
    }
})