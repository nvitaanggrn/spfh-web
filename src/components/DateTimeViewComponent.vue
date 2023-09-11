<template>
  <span>
    {{formated}}
  </span>
</template>

<script>
import moment from 'moment-timezone';

export default {
  props: ['value'],
  data(){
    return {
      formated: moment.utc(this.value)
        .tz('Asia/Jakarta')
        .locale('id')
        .format('D MMM Y HH:mm')
    }
  }
}
</script>