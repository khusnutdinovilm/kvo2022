
// import BaseInput from 'src/components/core/BaseInput.vue'
// import BaseSelect from 'src/components/core/BaseSelect.vue'
// import BaseTextarea from 'src/components/core/BaseTextarea.vue'
import components from 'src/components/core/';

export default({app}) =>{
  components.forEach(component => {
      app.component(component.name, component)
  })
}


// export default ({ app }) => {
//   app.component('base-input', BaseInput)
//   app.component('base-select', BaseSelect)
//   app.component('base-textarea', BaseTextarea)
// }