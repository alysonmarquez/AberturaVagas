// Code to run only once as the form loads
var mCargo = null;
if(runOnce){
  data.userSolicitante = currentUser;
  data.requerCorrecao = false;
  data.elegivelHomeOffice = "Sim";
  data.jornadaTrabalho = "200h";
  data.escalaDeTrabalho = "5x2";
  data.horarioTrabalho = "09h às 18h";
  data.elegivelHomeOffice = "SIM";
  data.requerAprovacaoComite = false;
  data.tipoVaga = "Prospecção";
  data.rateCard = "Sim";
}

if(currentPage == 1){
  if(obj.key == 'numeroDemanda') {
    data.demandaID = parseInt(obj.value);
  }

  if(data.obsCorrigir){
    schema.obsCorrigir.hide = false;
  }else{
    schema.obsCorrigir.hide = true;
  }

}


if(currentPage == 2){
 populateAutocompleteGerentes()
}

if(currentPage == 3){

//var dataPrevisaoInicio = data.dataPrevisaoInicio.split('-').reverse().join('/');
//data.dataPrevisaoInicio = dataPrevisaoInicio;
  
  if (data.combo1[0].items[0].beneficioFlash) {
    schema.valorFlash.hide = false;
  }else{
     schema.valorFlash.hide = true;
  }
  
  if (data.combo1[0].items[0].vagaBillable) {
    schema.RES_SalesForce.hide = false;
    schema.tcv.hide = false;
    schema.Rentabilidade.hide = false;
    schema.rateCard.hide = false;
    schema.receitaVaga.hide = false;
    data.requerAprovacaoComite = true;
  }else{
    schema.RES_SalesForce.hide = true;
    schema.tcv.hide = true;
    schema.Rentabilidade.hide = true;
    schema.rateCard.hide = true;
    schema.receitaVaga.hide = false;
    data.requerAprovacaoComite = false;
  }

  
   if(obj.key == 'cargo') {
     data.selectedCargoID = parseInt(obj.value);
  }

  
}

if(currentPage == 4){}

if(currentPage == 5){}

if(currentPage == 6){}

if(currentPage == 7){
   if (data.requerRecursos[0].items[0].chipCorporativo) {
    schema.dddNovaLinha.hide = false;
  }else{
    schema.dddNovaLinha.hide = true;
  }

  if (data.requerRecursos[0].items[0].requerEquipamento) {
    schema.tipoEquipamento.hide = false;
    schema.descEquipamento.hide = false;
    schema.sistemaOperacional.hide = false;
  }else{
    schema.tipoEquipamento.hide = true;
    schema.descEquipamento.hide = true;
    schema.sistemaOperacional.hide = true;
  }
}

// Code to run on the first page
if(continueClicked && currentPage == 1){
  
}

// Code to run on the second page
if(continueClicked && currentPage == 2){

}

if(continueClicked && currentPage == 3){

}

// Code to run after submit is clicked
if(submitting){
  data.numAprovacoes = 2;
  setAssignees();
  data.GestorVaga = data.autoNomeGestor;
  if(data.combo1[0].items[0].vagaBillable){
    data.requerAprovacaoComite = false;
  }else{
    data.requerAprovacaoComite = true;
  }

  
  if(data.chkDadosVaga[0].items[0].vagaConfidencial){
    data.tipoVagaConfidencial = "Sim";
  }else{
    data.tipoVagaConfidencial = "Não";
  }
  
  if(data.chkDadosVaga[0].items[0].vagaPCD){
    data.tipoVagaPCD = "Sim";
  }else{
    data.tipoVagaPCD = "Não";
  }
  
  if(data.chkDadosVaga[0].items[0].ADC){
    data.tipoVagaADC = "Sim";
  }else{
    data.tipoVagaADC = "Não";
  }

  if(data.tipoVaga == 'Prospecção'){
    data.VagaProspeccao = true;
  }else{
    data.VagaProspeccao = false;
  }
  
}

function setAssignees(){
  var myAssignees = null
  var inGroup = false;
  var isOp = false;
  
  for(var i=0; i < users.length; i++){
    var usersGroups = users[i].groups;
    for(var j=0; j < usersGroups.length; j++){
      if( (usersGroups[j].groupName).toLowerCase() == (data.consRegional).toLowerCase() ) {
        inGroup = true
       }

      if( (usersGroups[j].groupName).toLowerCase() == "operation performance" ) {
        isOp = true
      }
      if(inGroup && isOp){
        myAssignees = myAssignees == null ? users[i].id : myAssignees + ","+ users[i].id;
         inGroup = false;
        isOp = false;
      }
    }
  }
  
  data.assigneeUsers = myAssignees;
  data.requerCorrecao = false;
}

function populateAutocompleteGerentes(){
  var inGroup = false;
  var isGerente = false;
  for(var i=0; i < users.length; i++){
    var usersGroups = users[i].groups;
    for(var j=0; j < usersGroups.length; j++){
      if( (usersGroups[j].groupName).toLowerCase() == (data.consRegional).toLowerCase() ) {
        inGroup = true
       }
    
      if( (usersGroups[j].groupName).toLowerCase() == "gerentes" ) {
        isGerente = true
      }
      
      if(inGroup && isGerente){
        schema.autoNomeGestor.items.push({ name: users[i].firstName + ' ' + users[i].lastName, val: users[i].id });
        inGroup = false;
        isGerente = false;
      }
    }
  }
}