### **1. Inicialização ao carregar o formulário**
```js
if(runOnce){
  // Define valores padrão
  data.userSolicitante = currentUser;
  data.requerCorrecao = false;
  data.elegivelHomeOffice = "Sim";
  data.jornadaTrabalho = "200h";
  data.escalaDeTrabalho = "5x2";
  data.horarioTrabalho = "09h às 18h";
  data.elegivelHomeOffice = "SIM"; // duplicado, mas sem erro
  data.requerAprovacaoComite = false;
  data.tipoVaga = "Prospecção";
  data.rateCard = "Sim";
}
```
> **Resumo**: Quando o formulário é carregado pela primeira vez, são definidos diversos valores padrão no objeto `data`, como o solicitante, tipo de vaga, elegibilidade para home office, jornada de trabalho etc.

---

### **2. Lógica da Página 1**
```js
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
```
> **Resumo**:
- Se o campo `numeroDemanda` for alterado, ele converte para inteiro e armazena em `data.demandaID`.
- Exibe ou esconde o campo `obsCorrigir` com base em `data.obsCorrigir`.

---

### **3. Lógica da Página 2**
```js
if(currentPage == 2){
  populateAutocompleteGerentes()
}
```
> **Resumo**: Ao entrar na página 2, é chamada a função `populateAutocompleteGerentes`, que preenche a lista de gerentes com base no grupo regional.

---

### **4. Lógica da Página 3**
```js
if(currentPage == 3){
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
```
> **Resumo**:
- Se `beneficioFlash` estiver ativo, exibe o campo `valorFlash`.
- Se a vaga for "billable", exibe campos relacionados à parte financeira e define que requer aprovação do comitê.
- Quando o campo `cargo` for alterado, armazena o ID selecionado.

---

### **5. Página 7**
```js
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
```
> **Resumo**:
- Exibe campos relacionados a chip e equipamento se os recursos forem solicitados.

---

### **6. Ações ao clicar em "Continuar"**
```js
if(continueClicked && currentPage == 1){}
if(continueClicked && currentPage == 2){}
if(continueClicked && currentPage == 3){}
```
> **Resumo**: Blocos prontos para lógica adicional ao clicar em “continuar” em cada página. Estão vazios por enquanto.

---

### **7. Ações ao submeter o formulário**
```js
if(submitting){
  data.numAprovacoes = 2;
  setAssignees();
  data.GestorVaga = data.autoNomeGestor;

  if(data.combo1[0].items[0].vagaBillable){
    data.requerAprovacaoComite = false;
  }else{
    data.requerAprovacaoComite = true;
  }

  // Define status de vaga confidencial, PCD, ADC
  data.tipoVagaConfidencial = data.chkDadosVaga[0].items[0].vagaConfidencial ? "Sim" : "Não";
  data.tipoVagaPCD = data.chkDadosVaga[0].items[0].vagaPCD ? "Sim" : "Não";
  data.tipoVagaADC = data.chkDadosVaga[0].items[0].ADC ? "Sim" : "Não";

  data.VagaProspeccao = data.tipoVaga == 'Prospecção';
}
```
> **Resumo**:
- Define o número de aprovações necessárias.
- Define o gestor da vaga.
- Define aprovações com base em `vagaBillable`.
- Armazena status de vaga confidencial, PCD, ADC.
- Define se é uma vaga de prospecção.

---

### **8. Função `setAssignees()`**
```js
function setAssignees(){
  ...
}
```
> **Resumo**:
- Procura usuários que pertençam ao grupo regional e também ao grupo “operation performance”.
- Salva os IDs desses usuários em `data.assigneeUsers`.

---

### **9. Função `populateAutocompleteGerentes()`**
```js
function populateAutocompleteGerentes(){
  ...
}
```
> **Resumo**:
- Procura usuários que pertençam ao grupo regional **e** ao grupo “gerentes”.
- Preenche a lista `autoNomeGestor` com nome e ID dos gerentes encontrados.
