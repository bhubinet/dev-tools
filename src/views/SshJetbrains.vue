<template>
  <div class="about">
    <h1>Création d'un fichier de config SSH pour les outils Jetbrains</h1>
    <p><b>Emplacement PHPStorm :</b> [PROJET]/.idea/sshConfigs.xml</p>
    <p><b>Emplacement DataGrip [LOCAL] :</b> /Users/[USER]/DataGripProjects/[PROJET]/.idea/sshConfigs.xml</p>
    <p><b>Emplacement DataGrip [GLOBAL] :</b> /Users/[USER]/Library/Application Support/Jetbrains/[DATAGRIP_VERSION]/options/sshConfigs.xml</p>
    <input type="file" id="config_file" @change="loadConfigfile"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'SshJetbrains',
  components: {},
  data() {
    return {
      configFile: '',
    }
  },
  methods: {
    loadConfigfile(){
      var formData = new FormData();
      var file = document.querySelector('#config_file');
      formData.append("file", file.files[0]);

      axios.post('http://localhost:12500/create-ssh-config-jetbrains', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response);
        window.open('http://localhost:12500/' + response.data, '_blank');
      })
    }
  }
}
</script>
