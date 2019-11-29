(function (window,Vue,undefined) {
	var list = [{id:1,content:'abc',isfinished:false},{id:2,content:'abc',isfinished:true},{id:3,content:'abc',isfinished:false}]
	new Vue({
		el:'#app',
		data:{
			datalist:[],
			newdata:'',
			showlist:[]
		},
		watch: {
			datalist:{
				handler(newArr){
					window.localStorage.setItem('datalist',JSON.stringify(newArr))
				},
				deep:true
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData(){
				this.datalist = JSON.parse(window.localStorage.getItem('datalist')) || []
				this.showlist = this.datalist
			},
			add(){
				if(!this.newdata.trim()){
					return;
				}
				// this.datalist.push({
				// 	content:this.newdata,
				// 	isfinished:false,
				// 	id:this.datalist.length ? this.datalist.sort((a,b) => a.id - b.id)[this.datalist.length - 1]['id'] + 1 : 1
				// })
				this.datalist.unshift({
					content:this.newdata,
					isfinished:false,
					id:this.datalist.length ? this.datalist[0]['id'] + 1 : 1
				})
				this.showlist = this.datalist
				this.newdata = ''
			},
			del(index){
				this.datalist.splice(index,1)
				this.showlist = this.datalist
			},
			delAll(){
				this.datalist = this.datalist.filter(item => !item.isfinished)
				this.showlist = this.datalist
			},
			clickAll(){
				this.showlist = this.datalist

			},
			clickNow(){
				this.showlist = this.datalist.filter(item => !item.isfinished)
			},
			clickCom(){
				this.showlist = this.datalist.filter(item => item.isfinished)
			}
		},
		directives:{
			focus:{
				inserted(el){
					el.focus()
				}
			}
		},
		computed: {
			activeItemNum(){
				return this.datalist.filter(item => !item.isfinished).length
			},
			toggleAll:{
				get(){
					return this.datalist.every( item => item.isfinished)
				},
				set(val){
					this.datalist.forEach( item => (item.isfinished = val))
				}
			},

			// all(){
			// 	return this.datalist
			// },
			// now(){
				
			// 	return this.datalist.filter(item => !item.isfinished)
			// },
			// complete(){
			// 	return this.datalist.filter(item => item.isfinished)
			// }
		},
	})



})(window,Vue);
