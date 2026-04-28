import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, Switch, 
  TouchableOpacity, ScrollView, Alert, Image, FlatList, SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const DIGIDATA = [
  { id: '1', nome: 'Koromon', nivel: 'Treinamento', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/3/33/Koromon_b.jpg/revision/latest?cb=20131112231813&path-prefix=pt', desc: 'Um pequeno Digimon cujo corpo cresceu e o pelo escuro caiu. Koromon pode se movimentar muito bem, mas ainda não tem habilidades de combate.' },
  { id: '2', nome: 'Tsunomon', nivel: 'Treinamento', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/8/86/Tsunomon_t.jpg/revision/latest/scale-to-width-down/320?cb=20260219123621&path-prefix=pt', desc: 'Um pequeno digimon com um único chifre na cabeça. A pele de Tsunomon é coberta por um pelo macio e ele adora pregar peças.' },
  { id: '3', nome: 'Kudamon', nivel: 'Rookie', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/5/5d/Kudamon_2006_b.jpg/revision/latest/scale-to-width-down/320?cb=20200310002928&path-prefix=pt', desc: 'Um Digimon Besta Sagrada que está sempre enrolado à volta de um cartucho sagrado, do qual nunca se separa. Diz-se que acumula, continuamente, poder sagrado no brinco que tem na orelha esquerda e que esse poder será suficiente para influenciar a sua evolução. Tem uma personalidade calma, ponderada e reservada, que lhe permite dar apreciações, mesmo enquanto luta, onde procurará obter vantagem com as suas avaliações.' },
  { id: '4', nome: 'Tokomon', nivel: 'Treinamento', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/c/c5/Tokomon_t.jpg/revision/latest?cb=20140329223739&path-prefix=pt', desc: 'Um digimon pequeno e extremamente fofo, com quatro membros curtos que saem da parte inferior do seu corpo. No entanto, essa aparência inocente de nível treinamento pode enganar facilmente os adversários desavisados, pois ele esconde fileiras de dentes incrivelmente afiados dentro da sua boca para se defender de qualquer ameaça.' },
  { id: '5', nome: 'Nyaromon', nivel: 'Treinamento', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/e/e8/Nyaromon_b.jpg/revision/latest?cb=20140325223254&path-prefix=pt', desc: 'Um pequeno e curioso Digimon de nível Treinamento que possui características marcantes e divertidas de um gato. Está sempre vagando pelos campos digitais em busca de novidades. Apesar de parecer bastante frágil, suas ramificações de evolução podem tomar caminhos divinos poderosos, dependendo muito da forma como seu treinador o orienta.' },
  { id: '6', nome: 'Pagumon', nivel: 'Treinamento', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/5/59/Pagumon_b.jpg/revision/latest/scale-to-width-down/320?cb=20200309233613&path-prefix=pt', desc: 'Um pequeno Digimon de nível Treinamento conhecido por sua personalidade extremamente travessa e maliciosa. Ele adora intimidar e pregar peças impiedosas em outros monstros mais fracos pelos campos do Digimundo. Seu ataque principal é a Bolha Venenosa, e, devido à sua natureza sombria, ele possui uma grande facilidade para digivolver para rotas perigosas do atributo Vírus, como o DemiDevimon ou Impmon.' },
  { id: '7', nome: 'Agumon', nivel: 'Rookie', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/a/ac/Agumon_t.jpg/revision/latest/scale-to-width-down/320?cb=20230704033157&path-prefix=pt', desc: 'Um Digimon réptil bípede de atributo Vacina. Muito leal e corajoso, seu ataque principal é o Bafo de Pimenta.' },
  { id: '8', nome: 'Guilmon', nivel: 'Rookie', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/a/a1/Guilmon_b.jpg/revision/latest?cb=20140419011316&path-prefix=pt', desc: 'Um Digimon dinossauro do atributo Vírus que possui um instinto selvagem muito forte, mas com uma alma genuinamente pura. Ele carrega a marca perigosa do Digital Hazard em seu peito, indicando um imenso poder latente e destrutivo que precisa ser guiado com sabedoria pelo seu domador durante as duras batalhas.' },
  { id: '9', nome: 'Patamon', nivel: 'Rookie', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/7/77/Patamon_b.jpg/revision/latest/scale-to-width-down/320?cb=20251112143815&path-prefix=pt', desc: 'Um digimon que corrói dados em altíssima velocidade, causando enormes falhas de rede por onde passa.' },   
  { id: '10', nome: 'Gabumon', nivel: 'Rookie', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/d/d1/Gabumon_b.jpg/revision/latest?cb=20140419005946&path-prefix=pt', desc: 'Um Digimon do atributo Data coberto por um casaco de pele de lobo que ele usa para se proteger.' },
  { id: '11', nome: 'Greymon', nivel: 'Champion', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/a/af/Greymon_t.jpg/revision/latest/scale-to-width-down/320?cb=20260226014238&path-prefix=pt', desc: 'A evolução imponente do Agumon. Este dinossauro possui uma carapaça óssea impenetrável protegendo sua cabeça.' },
  { id: '12', nome: 'Garurumon', nivel: 'Champion', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/2/20/Garurumon_b.jpg/revision/latest?cb=20140419010158&path-prefix=pt', desc: 'Um temível lobo gigante com presas afiadas e agilidade formidável. Sua pelagem azul prateada é extremamente dura.' },
  { id: '13', nome: 'MetalGreymon', nivel: 'Ultimate', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/c/c4/MetalGreymon_%28Vaccine%29_b.jpg/revision/latest?cb=20140406165915&path-prefix=pt', desc: 'Um ciborgue colossal que alcançou o nível Ultimate. Equipado com uma garra de tridente e mísseis orgânicos.' },
  { id: '14', nome: 'WereGarurumon', nivel: 'Ultimate', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/c/c9/WereGarurumon_b.jpg/revision/latest/scale-to-width-down/320?cb=20200816005932&path-prefix=pt', desc: 'A evolução bípede do Garurumon. Sacrificou velocidade para ganhar incrível força física e habilidades táticas.' },
  { id: '15', nome: 'WarGreymon', nivel: 'Mega', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/4/49/WarGreymon_b.jpg/revision/latest/scale-to-width-down/320?cb=20221031064703&path-prefix=pt', desc: 'O guerreiro dragão supremo de nível Mega revestido por Chrome Digizoid.' },
  { id: '16', nome: 'MetalGarurumon', nivel: 'Mega', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/1/1d/MetalGarurumon_b.jpg/revision/latest?cb=20140406165657&path-prefix=pt', desc: 'A forma Mega mecanizada. Equipado com inúmeros sensores e mísseis de todas as partes de sua armadura.' },
  { id: '17', nome: 'Omegamon', nivel: 'Mega Plus', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/2/22/Omegamon_b.jpg/revision/latest/scale-to-width-down/320?cb=20210929085216&path-prefix=pt', desc: 'O milagre nascido da fusão de DNA entre WarGreymon e MetalGarurumon. Possuindo o prestigiado título de Cavaleiro Real, ele é a entidade máxima de combate no mundo digital. Seu braço esquerdo carrega a espada implacável da coragem, enquanto o direito dispara o canhão absoluto da amizade para obliterar as trevas.' },
  { id: '18', nome: 'Coronamon', nivel: 'Rookie', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/1/14/Coronamon_b.jpg/revision/latest/scale-to-width-down/320?cb=20210220162420&path-prefix=pt', desc: 'Um Digimon Besta que nasceu de uma mistura de dados sobre observações solares. Devido ao seu absolutamente sincero sentido de justiça, tem uma personalidade inocente.' },
  { id: '19', nome: 'Lunamon', nivel: 'Rookie', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/b/bc/Lunamon_b.jpg/revision/latest/scale-to-width-down/320?cb=20210220163206&path-prefix=pt', desc: 'Um Digimon Mamífero que parece um coelho e nasceu de uma mistura de dados sobre observações lunares. Com as suas grandes orelhas, consegue reconhecer sons a qualquer distância. Apesar de ser tímido, apega-se facilmente aos outros e não gosta nada de estar sozinho.' },
  { id: '20', nome: 'Impmon', nivel: 'Rookie', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/0/02/Impmon_b.jpg/revision/latest?cb=20140417182626&path-prefix=pt', desc: 'Um Digimon Criança que parece um filhote de demónio. Adora pregar partidas e assistir ao sofrimento dos oponentes traz-lhe muita satisfação. Diz-se que os aparelhos eletrónicos demonstram comportamentos bizarros quando Impmon aparece, por isso, quando reparares numa imagem eletrónica a ficar baralhada ou a parar de funcionar, talvez seja mais uma das suas partidas.' },
  { id: '21', nome: 'Witchmon', nivel: 'Champion', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/9/93/Witchmon_b.jpg/revision/latest?cb=20140315175140&path-prefix=pt', desc: 'Um Digimon com a aparência de uma bruxa que veio de Witchelny, o Digital World de outra dimensão, em busca do seu rival Wizarmon. No seu Digital World nativo, dominou a feitiçaria (linguagem de programação de alto-nível) do Vento e da Água, e agora treina diligentemente neste Digital World, seguindo o exemplo de Wizarmon' },
  { id: '22', nome: 'LadyDevimon', nivel: 'Ultimate', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/8/87/LadyDevimon_b.jpg/revision/latest/scale-to-width-down/320?cb=20231020194424&path-prefix=pt', desc: 'Um Digimon Anjo feminino de nobre estatura. Por esconder um poder do lado escuro incomparavelmente puro, diz-se que as chances de singrar a longo prazo em computadores pessoas são "zero". O seu movimento especial é Darkness Wave, no qual liberta incontáveis criaturas das trevas semelhantes a morcegos que queimam completamente o adversário.' },
  { id: '23', nome: 'Lilithmon', nivel: 'Mega', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/3/39/Lilithmon_b.jpg/revision/latest/scale-to-width-down/320?cb=20190707191917&path-prefix=pt', desc: 'Um Digimon Lorde Demónio com forma feminina e membro dos Sete Grandes Lordes Demónio. Diz-se que, originalmente, era um Digimon como Ofanimon, antes de cair dos céus e tornar-se conhecido como "Deusa das Trevas". Confunde os oponentes com uma figura encantadora e leva todos os que caem na sua tentação à morte. A sua alcunha de "Deusa das Trevas" é mais que apropriada, pois responde ao vício com generosidade e à virtude com raiva cruel.' },
  { id: '24', nome: 'BeelStarmon', nivel: 'Mega', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/3/3e/Beelstarmon_b.jpg/revision/latest/scale-to-width-down/320?cb=20221031064846&path-prefix=pt', desc: 'Um Digimon a quem chamam "Beelzebumon Lady", por causa do seu visual. As suas adoradas pistolas duplas Rizoma de Loto, que empunha tão esplendidamente, são como irmãs mais novas da Berenjena de Beelzebumon. Não tem quaisquer reservas com Digimons em geral e dá-se particularmente bem com outros portadores de pistolas como MagnaKidmon, que até lhe chama "Beelko[N 1]". Contudo, o caso muda de figura com o solitário Beelzebumon: embora reconheça as suas capacidades, as desavenças entre ambos levam Beelstarmon a manter alguma distância. Veste um fato azeviche feito de couro e usa um cachecol que se pode transformar de acordo com a situação, servindo para defesa, para ataque, ou como asas.' },
  { id: '25', nome: 'Mastermon', nivel: 'Mega', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/7/72/Mastemon_b.jpg/revision/latest/scale-to-width-down/320?cb=20231031112913&path-prefix=pt', desc: 'Um Digimon Anjo cuja forma foi lograda quando os incompatíveis Digimons Anjo e Anjo Caído se uniram e atingiram a Evolução Jogress, quando uma crise sem precedentes caía sobre o Digital World. Ultrapassa dificuldades ao controlar as forças das tribos Anjo e Anjo Caído de outro Digital World, através dos portais a que se liga. É devido à natureza de Mastemon, a quem chamam "Estratega de Outro Mundo", que as duas espécies, normalmente hostis uma para com a outra, conseguem unificar-se. Por possuir um único coração, apesar de ser uma Evolução Jogress entre dois opostos, várias situações levam-no a emprestar o seu poder a outros Digimons, ao manipular livremente as energias da luz e da escuridão, sendo também capaz de enfrentar oponentes formidáveis por si só.' },
  { id: '26', nome: 'Salamon', nivel: 'Rookie', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/2/2c/Plotmon_b.jpg/revision/latest?cb=20140325001139&path-prefix=pt', desc:'Um Digimon Criança das Espécies Sagradas caracterizado pelas suas orelhas descaídas. Por ainda ser muito jovem, é incapaz de manifestar os seus poderes sagrados e nem sequer está consciente da sua missão. Por essa razão, é naturalmente inseguro, pelo que pode tornar-se bom ou mau. No entanto, um dia virá a hora em que Plotmon, que nasceu como um Digimon das Espécies Sagradas, despertará para a sua missão como um dos "Virus Busters"'},
  { id: '27', nome: 'Tailmon', nivel: 'Champion', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/2/2f/Tailmon_t.jpg/revision/latest?cb=20140330155342&path-prefix=pt', desc: 'Adora partidas e é imensamente curioso. Apesar do seu pequeno porte, é um valioso Digimon das Espécies Sagradas cuja aparência não combina com a força que possui. Porta um Holy Ring na cauda, o que o estabelece como uma Espécie Sagrada, mas se o perder, fica enfraquecido e deixa de conseguir demonstrar o seu poder original.'},
  { id: '28', nome: 'Angewomon', nivel: 'Ultimate', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/3/39/Angewomon_b.jpg/revision/latest?cb=20140326210302&path-prefix=pt', desc: 'Um Digimon Arcanjo com a aparência de uma bela mulher. Anteriormente classificada como tipo Anjo, as suas habilidades grandiosas elevaram-no a tipo Arcanjo. Anjos do nível Adulto possuem seis asas, enquanto que Anjos do nível Perfeito possuem oito asas. Apesar de ter uma personalidade extremamente gentil, não tem compaixão com indivíduos desonestos ou malvados, mantendo-os sob ataque até que decidam converter-se ao Bem.' },
  { id: '29', nome: 'Ofanimon', nivel: 'Mega', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/6/60/Ofanimon_b.jpg/revision/latest?cb=20140323220603&path-prefix=pt', desc: 'Um Digimon Ofanim que é a forma derradeira dos Digimons Anjo femininos. Ao lado de Seraphimon e Cherubimon, é um dos "Três Grandes Anjos" que protegem o "Kernel" (domínio de Deus) e cada um tem o seu dever.' },
  { id: '30', nome: 'Holydramon', nivel: 'Mega', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/9/95/Holydramon_b.jpg/revision/latest?cb=20141004002441&path-prefix=pt', desc: 'A derradeira forma dos Digimons besta divinos. A sua figura heróica sugere um governador dos céus. Muito poucos são os que o viram e o seu paradeiro ainda não é completamente conhecido. No entanto, diz-se que, uma vez, apareceu do nada e devastou com o seu imenso poder a gigante energia do mal que se havia gerado no Digital World. ' },
  { id: '32', nome: 'Leskimon', nivel: 'Champion', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/1/13/Lekismon_b.jpg/revision/latest/scale-to-width-down/320?cb=20210220163330&path-prefix=pt', desc: 'Um Digimon Homem-Besta que adquiriu um incrível poder de salto. Aliado aos seus movimentos rápidos, usa-o para troçar do inimigo. Tal como os dois quartos da Lua, possui uma personalidade instável, e a sua aparência é algo misteriosa.' },
  { id: '33', nome: 'Crescemon', nivel: 'Ultimate', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/6/63/Crescemon_b.jpg/revision/latest/scale-to-width-down/320?cb=20210220163613&path-prefix=pt', desc: 'Um Digimon Homem-Demónio cujo corpo é flexível, ela derrota o inimigo com os seus movimentos ágeis. Ela é especializada em usar a sua maleabilidade elegantemente em combate e diz-se que ela se duplica quando recebe a luz da Lua. O seu movimento especial é deslumbrar o oponente com os seus passos de dança antes de lhe entregar o golpe final com as armas seguradas por ambas as mãos, "Nova Luna (Lat: Lua Nova)" (Lunatic Dance). Além disso, pode mudar a forma da "Nova Luna" numa balestra, combinando-as.' },
  { id: '34', nome: 'Dianamon', nivel: 'Mega', tipo: 'Data', img: 'https://static.wikia.nocookie.net/digimonat/images/8/8d/Dianamon_b.jpg/revision/latest/scale-to-width-down/320?cb=20200310001203&path-prefix=pt', desc: 'Um dos "Olympos XII", este Digimon Homem-Deus preside o gelo e a água e é capaz de lutar mesmo em ambientes abaixo do zero absoluto. Assim como a lua tem dois lados (claro e escuro), a sua personalidade é de carácter bilateral, e a sua beleza oculta uma terrível quantia de poder. '},
  { id: '35', nome: 'GraceNovamon', nivel: 'Mega Plus', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/e/e5/GraceNovamon_b.jpg/revision/latest/scale-to-width-down/320?cb=20240707233644&path-prefix=pt', desc: 'Um mítico Digimon Galáxia que se diz ter nascido da fusão entre os membros dos Olympos XII, Apollomon e Dianamon, quando uma crise sem precedentes assomava o Digital World: Ilíada. Ao colidir as energias opostas do sol e da lua, gerou-se dentro de si uma energia comparável ao Big Bang. Assim, presume-se que GraceNovamon se tenha tornado numa galáxia própria, e diz-se que é impossível medir a sua capacidade de dados com precisão.' },
  { id: '36', nome: 'Firamon', nivel: 'Champion', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/5/5d/Firamon_b.jpg/revision/latest/scale-to-width-down/320?cb=20210220162637&path-prefix=pt', desc: 'Um Digimon Besta a quem chamam "Leão que Corre no Céu". É um Digimon consciencioso com ar de líder que protege umas certas ruínas do Digital World. Os seus movimentos especiais consistem em cobrir o corpo com chamas, antes de mergulhar do céu (Flame Dive) e despedaçar o inimigo com as garras das patas anteriores envoltas em fogo (Fira Claw).' },
  { id: '37', nome: 'Flaremon', nivel: 'Ultimate', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/f/fc/Flaremon_b.jpg/revision/latest/scale-to-width-down/320?cb=20210220162822&path-prefix=pt', desc: 'A sua juba regal e ar imponente podem ser intimidantes, mas Flaremon é um Digimon Homem Besta muito determinado que está disposto a enfrentar qualquer problema pelos seus aliados. Os seus movimentos especiais consistem em concentrar chamas e o espírito de um leão no punho e depois lançá-los como uma onda de energia com forma de leão (Guren Juuouha), e em desferir múltiplos golpes de artes marciais com os punhos e pernas em chamas (Kurenai Shishi no Mai).' },
  { id: '38', nome: 'Apollomon', nivel: 'Mega', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/d/dc/Apollomon_b.jpg/revision/latest?cb=20140725034409&path-prefix=pt', desc: 'Um dos "Olympos XII", é um Digimon Homem-Deus que esconde energia flamejante de classe solar. Essa energia tem uma terrível capacidade de fundir todas as substâncias, e o seu orgulho e entusiasmo quase cruel são mal contidos. Os seus movimentos especiais consistem em disparar uma esfera de energia solar escaldante, gerada a partir da esfera de fogo nas suas costas (Sol Blaster), e um único golpe mortal vindo de um punho cheio de poder oculto (Phoebus Blow). ' },
  { id: '39', nome: 'Agnimon', nivel: 'Champion', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/1/16/Agnimon_b.jpg/revision/latest/scale-to-width-down/320?cb=20191231010625&path-prefix=pt', desc: 'Um Digimon que possui poder sobre o Fogo e carrega a força de um dos lendários Dez Guerreiros. Devido ao seu DigiCore estar envolto no Spiritual Fire, que é considerado uma chama sagrada, é capaz de manipular livremente chamas. É uma encarnação da Firewall que defende a Net e é uma divindade guardiã. Por causa da sua personalidade facilmente empolgada, ele tem um aspeto de soldado, que executa práticas de treinamento mental com exercícios de yoga, e o seu modo de falar é um pouco arcaico, como um artista kenpo.' },
  { id: '40', nome: 'Vritramon', nivel: 'Ultimate', tipo: 'Neutro', img:'https://static.wikia.nocookie.net/digimonat/images/d/d7/Vritramon_b.jpg/revision/latest/scale-to-width-down/320?cb=20200604025434&path-prefix=pt' , desc:'Um Digimon que possui poder sobre o Fogo e carrega a força de um dos lendários Dez Guerreiros. Este bombeiro tem pele que pode resistir a altas temperaturas, a capacidade de mover-se até mesmo através da lava, e expele chamas com labaredas instantâneas explosivas. Diz-se que nasceu a partir dos dados de pesquisa de um vulcão ativo e pensa-se que ele contém uma energia imensurável ignota. O nome do dragão de fogo, que é considerado o inimigo do Deus do Raio, Indra, da mitologia indiana, está incorporado na sua natureza feroz.' },
  { id: '41', nome: 'Aldamon', nivel: 'Mega', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/c/cf/Aldamon_b.jpg/revision/latest?cb=20140423182457&path-prefix=pt', desc: 'Um Digimon que possui poder sobre o Fogo e transcendeu a lenda ao herdar todo o poder de um dos lendários Dez Guerreiros, adquirindo habilidades desconhecidas. Embora não faça muitos inimigos com o seu comportamento rude, o seu nome é derivado da forma fundida de um deus da mitologia indiana e, uma vez que possui tanto a selvajaria de um animal, bem como a inteligência de um ser humano, é um Deus-Demónio que luta pela conversão da raiva ou medo em poder justo. Em batalha, ele desencadeia ataques super amplos e variados que derretem tudo, pelo que queima sem deixar vestígios. Este aspeto possui poder destrutivo o suficiente, neste momento, para ter uma estreita semelhança com a ameaça das armas nucleares modernas.' },
  { id: '42', nome: 'KaiserGreymon', nivel: 'Mega', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/1/10/KaiserGreymon_b.jpg/revision/latest?cb=20140417182906&path-prefix=pt', desc: 'Uma "Espécie Transcendente" Digimon que possui poder sobre o Fogo e diz-se ter superado até mesmo a força dos lendários Dez Guerreiros. É dito que carrega o poder das veias dos nove dragões, que fluem através de Gaia, e é profetizado que, se restringir o poder dos noves dragões, ele irá demonstrar uma habilidade insondável e até mesmo será capaz de governar Gaia. Diz-se que, a fim de controlar o seu poder, possui a "Ryūgonken", na qual almas de dragões estão seladas. ' },
  { id: '43', nome: 'lobomon', nivel: 'Champion', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/9/9c/Wolfmon_b.jpg/revision/latest?cb=20140315175213&path-prefix=pt', desc: 'Um Digimon que possui poder sobre a Luz e carrega a força de um dos lendários Dez Guerreiros. As partes coloridas de lavanda no seu corpo chamam-se "Saint Amethyst", nas quais a luz sagrada está contida. Devido a ela, a ametista mantém a sua dureza extraordinária, desde que ele mantenha o seu espírito justo, mas, segundo, se um espírito negativo surgir no possuidor, ela tornar-se-à frágil. É possuidor de um espírito cavalheiresco, que coloca a sua vida em risco para as coisa em que acredita e odeia a injustiça. Uma vez que Wolfmon é taciturno e não gosta muito de preocupar-se com os outros, muitas vezes dá a impressão que é frio e insensível, mas, na verdade, é um guerreiro de bom coração.' },
  { id: '44', nome: 'Garumom', nivel: 'Ultimate', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/e/ee/Garummon_b.jpg/revision/latest?cb=20140516131921&path-prefix=pt', desc: 'Um Digimon que possui poder sobre a Luz e carrega a força de um dos lendários Dez Guerreiros. Ele é capaz de mover-se em altíssima velocidade, talvez porque foi descoberto numa comunicação ótica da Net, assim que desliza através das balas para chegar perto do inimigo e, de seguida, as suas garras e presas fortemente pontiagudas rasgam aqueles que considera maus, sem perder fôlego em discussão.' },
  { id: '45', nome: 'Beowolfmon', nivel: 'Mega', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/3/38/BeoWolfmon_b.jpg/revision/latest?cb=20140421030120&path-prefix=pt', desc: 'Um Digimon que possui poder sobre a Luz e transcendeu a lenda ao herdar todo o poder de um dos lendários Dez Guerreiros, adquirindo habilidades desconhecidas. Ele é um guerreiro forte armado que possui tanto a selvageria de um animal, bem como a inteligência de um ser humano, e pode facilmente oscilar para baixo a sua longa espada de dois gumes "Trinität" com uma mão. Em batalha, ele examina tranquilamente a situação e luta sem se empolgar, mas acredita no caminho do guerreiro, lutando pelos seus companheiros e desafiando adversários fortes.' },
  { id: '46', nome: 'MagnaGarurumon', nivel: 'Mega', tipo: 'Neutro', img: 'https://static.wikia.nocookie.net/digimonat/images/c/ca/MagnaGarurumon_b.jpg/revision/latest?cb=20140406165002&path-prefix=pt', desc: 'Uma "Espécie Transcendente" Digimon que possui poder sobre a luz e diz-se ter superado até a força dos lendários Dez Guerreiros. Especializa-se em movimentos à velocidade da luz e, quando tem a sua unidade de aviação equipada, consegue voar a velocidades superlumínicas. Além disso, a armadura que tem no peito, o "Sniper Phantom" de disparo a longo alcance no seu braço direito e o "Strike Phantom" de disparo a médio alcance no seu braço esquerdo podem ser desacoplatos, embora isso faça o seu poder de fogo decrescer.' },
  { id: '47', nome: 'Susanoomon', nivel: 'Mega Plus', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/6/6d/Susanoomon_b.jpg/revision/latest/scale-to-width-down/320?cb=20221215015128&path-prefix=pt', desc: 'Contado em lendas orientais, é o deus mais forte e destrutivo, que governa sobre a regeneração. Diz-se que quando o "Network System" entrar em caos, ele irá apagar o sistema existente e criar um novo. ' },
  { id: '48', nome: 'Angemon', nivel: 'Champion', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/0/08/Angemon_b.jpg/revision/latest/scale-to-width-down/320?cb=20230111045639&path-prefix=pt', desc: 'Um Digimon Anjo com seis asas brilhantes e o corpo revestido de um tecido branco tão puro que parece divino. Apesar de ser conhecido como um Digimon de virtude absoluta que traz a felicidade, quando confronta o mal, ataca incessantemente, sem nunca perder a compostura, até que o adversário seja aniquilado por completo. Diz-se que sempre que uma crise assola o Digital World, descende e lidera Digimons semelhantes. Supostamente, Devimon era um Digimon da mesma espécie que Angemon, antes de ser conquistado pelo lado negro. ' },
  { id: '49', nome: 'HolyAngemon', nivel: 'Ultimate', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/2/22/HolyAngemon_b.jpg/revision/latest?cb=20140326155710&path-prefix=pt', desc: 'Um Digimon Arcanjo com oito asas prateadas e brilhantes. A missão de HolyAngemon no Digital World é supervisionar e examinar os muitos Digimons Anjo enquanto agente de autoridade. Em alturas de normalidade, assume a sua forma de sacerdote e age como porta-voz da luz, isto é, da preservação da ordem no Digital World, mas assim que a escuridão surge a encobrir o mundo, assume o seu Modo de Batalha para a combater. Uma vez no Modo de Batalha, relega o oponente ao olvido com o Beam Shield que cobre o seu braço esquerdo e a espada sagrada Excalibur que porta no braço direito.' },
  { id: '50', nome: 'Seraphimon', nivel: 'Mega', tipo: 'Vacina', img: 'https://static.wikia.nocookie.net/digimonat/images/f/f9/Seraphimon_b.jpg/revision/latest?cb=20140319225604&path-prefix=pt', desc: 'Um Digimon Serafim vestido numa armadura sagrada que brilha de prateado e possui dez asas douradas. Como o Digimon Anjo de mais elevado estatuto, governa sobre todos eles. Embora a sua verdadeira face e pessoa estejam escondidas atrás de uma máscara e não possam ser vislumbradas, é o ser mais próximo do "Ser do Bem" chamado "Deus". Diz-se que quando descender para a batalha final contra os seres do mal, purificará tudo.' },
  { id: '51', nome: 'Growmon', nivel: 'Champion', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/5/5f/Growmon_b.jpg/revision/latest?cb=20140419011219&path-prefix=pt', desc: 'Um Digimon Dragão-Demónio que é chamado "Dragão-Demónio Carmesim". A infantilidade que lhe era própria enquanto Guilmon desapareceu, evoluindo para um monstro muito mais selvagem e brutal. É de atributo Virus, mas também pode lutar pela justiça, conforme o seu Tamer o criar, pois é muito obediente. O rugido de Growmon tem o poder de agitar a terra e, antes de combater, ruge ruidosamente para intimidar o inimigo. O seu movimento característico consiste em desenvolver plasma ao longo das lâminas nos seus cotovelos e atacar o oponente com elas (Plasma Blade). ' },
  { id: '52', nome: 'MegaloGrowmon', nivel: 'Ultimate', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/8/80/MegaloGrowmon_b.jpg/revision/latest?cb=20140406165455&path-prefix=pt', desc: 'Possuindo o nome "Grande Growmon", é um Digimon Perfeito do tipo Ciborgue. Tal como o seu nome sugere, sofreu um grande crescimento corporal, e o seu corpo superior foi metalizado com o super metal Chrome DigiZoid. É capaz de voar com os dois propulsores vernier anexados aos seus ombros, pelo que lhe é possível executar ataques antiaéreos e antiterreno. Para que não se descontrolasse, com o seu poder excessivo, foi-lhe instalada uma ferramenta de arreio semelhante a um bridão na zona maxilar.' },
  { id: '53', nome: 'Dukemon', nivel: 'Mega', tipo: 'Virus', img: 'https://static.wikia.nocookie.net/digimonat/images/2/20/Dukemon_b.jpg/revision/latest/scale-to-width-down/320?cb=20230322194348&path-prefix=pt', desc: 'Este Digimon Cavaleiro Sagrado é chamado um dos "Royal Knights", junto a Omegamon e Magnamon. Os Royal Knights são Digimons colocados no mais elevado escalão de Network Security, por isso é absolutamente impossível violar a segurança na sua presença. Como ser, é contraditório, pois é considerado uma divindade guardiã da Net embora seja do atributo Virus, e se por algum motivo o seu equilíbrio quebrar, é possível que se torne numa existência perigosa. Está revestido numa armadura sagrada, refinada e construída por 99,9% de puro Chrome DigiZoid, e a sua mão direita pode converter-se na lança sagrada "Gram", enquanto que a sua mão esquerda pode tornar-se no escudo sagrado "Aegis".' }

];


export default function App() {
  const [telaAtual, setTelaAtual] = useState('lista'); 
  const [selecionado, setSelecionado] = useState(DIGIDATA); 

// ANTES:
  // const [tamer1, setTamer1] = useState('');
  // const [tamer2, setTamer2] = useState('');

  // DEPOIS:
  const [digimon1, setDigimon1] = useState('');
  const [digimon2, setDigimon2] = useState('');
  const [servidor, setServidor] = useState('');
  const [codigo, setCodigo] = useState('');
  const [rota1, setRota1] = useState('Vacina');
  const [rota2, setRota2] = useState('Data');
  const [pronto1, setPronto1] = useState(false);
  const [pronto2, setPronto2] = useState(false);
  const [sync1, setSync1] = useState(0);
  const [sync2, setSync2] = useState(0);
  
  // 👉 ADICIONE ESSA LINHA AQUI, SE ELA ESTIVER FALTANDO:
  // 👉 ADICIONE ESSA LINHA AQUI, SE ELA ESTIVER FALTANDO:
  const [jogressFeita, setJogressFeita] = useState(null);

  const getDigimonEvolucao = (val, tamer) => {
    if (tamer === 1) { 
      // Rota Clássica do Agumon
      if (rota1 === 'Vacina') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'WarGreymon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'MetalGreymon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Greymon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Agumon') || DIGIDATA;
        // 👉 RAIZ KOROMON
        return DIGIDATA.find(d => d.nome === 'Koromon') || DIGIDATA;
      } 
      // Rota NYAROMON -> SALAMON
      else if (rota1 === 'Ang_Ofani' || rota1 === 'Ang_Holy') {
        if (val >= 90) {
          if (rota1 === 'Ang_Ofani') return DIGIDATA.find(d => d.nome === 'Ofanimon') || DIGIDATA;
          if (rota1 === 'Ang_Holy') return DIGIDATA.find(d => d.nome === 'Holydramon') || DIGIDATA;
        }
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'Angewomon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Tailmon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Salamon') || DIGIDATA;
        // 👉 RAIZ NYAROMON
        return DIGIDATA.find(d => d.nome === 'Nyaromon') || DIGIDATA;
      }
      else if (rota1 === 'Coro_Apollo') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'Apollomon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'Flaremon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Firamon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Coronamon') || DIGIDATA;
        return DIGIDATA.find(d => d.nome === 'Tokomon') || DIGIDATA; 
}
      // Rota TOKOMON -> CORONAMON
      else if (rota1 === 'Coro_Fogo') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'KaiserGreymon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'Vritramon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Agnimon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Coronamon') || DIGIDATA;
        // 👉 RAIZ TOKOMON
        return DIGIDATA.find(d => d.nome === 'Tokomon') || DIGIDATA; 
      }
      // Rota TOKOMON -> PATAMON
      else if (rota1 === 'VacinaPata') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'Seraphimon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'HolyAngemon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Angemon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Patamon') || DIGIDATA;
        // 👉 RAIZ TOKOMON
        return DIGIDATA.find(d => d.nome === 'Tokomon') || DIGIDATA; 
      }

    } else { 
      // Rota Clássica do Gabumon
      if (rota2 === 'Data') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'MetalGarurumon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'WereGarurumon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Garurumon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Gabumon') || DIGIDATA;
        // 👉 RAIZ TSUNOMON
        return DIGIDATA.find(d => d.nome === 'Tsunomon') || DIGIDATA;
      } 
      // Rota PAGUMON -> IMPMON -> LADYDEVIMON
      else if (rota2 === 'Lady_Lilith' || rota2 === 'Lady_Beel') {
        if (val >= 90) {
           if (rota2 === 'Lady_Lilith') return DIGIDATA.find(d => d.nome === 'Lilithmon') || DIGIDATA;
           if (rota2 === 'Lady_Beel') return DIGIDATA.find(d => d.nome === 'BeelStarmon') || DIGIDATA;
        }
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'LadyDevimon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Witchmon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Impmon') || DIGIDATA;
        // 👉 RAIZ PAGUMON
        return DIGIDATA.find(d => d.nome === 'Pagumon') || DIGIDATA;
      }
      // Rota NYAROMON -> KUDAMON
      else if (rota2 === 'Kuda_Luz') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'MagnaGarurumon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'Garumom') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'lobomon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Kudamon') || DIGIDATA;
        // 👉 RAIZ NYAROMON
        return DIGIDATA.find(d => d.nome === 'Nyaromon') || DIGIDATA;
      }
      // Rota KOROMON -> GUILMON
      else if (rota2 === 'VirusGuil') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'Dukemon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'MegaloGrowmon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Growmon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Guilmon') || DIGIDATA;
        // 👉 RAIZ KOROMON
        return DIGIDATA.find(d => d.nome === 'Koromon') || DIGIDATA; 
      }
      // NOVA ROTA: NYAROMON -> LUNAMON
      else if (rota2 === 'DataLuna') {
        if (val >= 90) return DIGIDATA.find(d => d.nome === 'Dianamon') || DIGIDATA;
        if (val >= 75) return DIGIDATA.find(d => d.nome === 'Crescemon') || DIGIDATA;
        if (val >= 50) return DIGIDATA.find(d => d.nome === 'Leskimon') || DIGIDATA;
        if (val >= 25) return DIGIDATA.find(d => d.nome === 'Lunamon') || DIGIDATA;
        // 👉 RAIZ NYAROMON
        return DIGIDATA.find(d => d.nome === 'Nyaromon') || DIGIDATA; 
      }
    }
    return DIGIDATA; 
  };

  const digiTamer1 = getDigimonEvolucao(sync1, 1);
  const digiTamer2 = getDigimonEvolucao(sync2, 2);

  // 1. Definição dos dados das Fusões (Puxando do banco)
  const omegamonData = DIGIDATA.find(d => d.nome === 'Omegamon'); 
  const mastemonData = DIGIDATA.find(d => d.nome === 'Mastermon');
  const susanooData = DIGIDATA.find(d => d.nome === 'Susanoomon');
  const graceNovaData = DIGIDATA.find(d => d.nome === 'GraceNovamon'); // Carrega os dados para o botão

  // 2. Regras de Fusão
  const isOmegamon = sync1 === 100 && sync2 === 100 && pronto1 && pronto2;

  const isMastemon = 
    ((digiTamer1.nome === 'Angewomon' && digiTamer2.nome === 'LadyDevimon') || 
     (digiTamer1.nome === 'LadyDevimon' && digiTamer2.nome === 'Angewomon')) &&
    (sync1 >= 75 && sync1 < 90) && 
    (sync2 >= 75 && sync2 < 90) && 
    pronto1 && pronto2;

  const isSusanoomon = 
    ((digiTamer1.nome === 'KaiserGreymon' && digiTamer2.nome === 'MagnaGarurumon') || 
     (digiTamer1.nome === 'MagnaGarurumon' && digiTamer2.nome === 'KaiserGreymon')) &&
    sync1 === 100 && sync2 === 100 && pronto1 && pronto2;

  const isGraceNovamon = 
    ((digiTamer1.nome === 'Apollomon' && digiTamer2.nome === 'Dianamon') || 
     (digiTamer1.nome === 'Dianamon' && digiTamer2.nome === 'Apollomon')) &&
    sync1 === 100 && sync2 === 100 && pronto1 && pronto2;

  // 3. Variável que libera o botão (Todas as 4 fusões)
  const fusaoPronta = isOmegamon || isMastemon || isSusanoomon || isGraceNovamon;

  // Função para limpar tudo
  const resetar = () => {
    setSync1(0); 
    setSync2(0); 
    setPronto1(false); 
    setPronto2(false);
    setJogressFeita(false); // Esconde o Omegamon
  };
return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setTelaAtual('lista')}><Text style={styles.navText}>DIGIDEX</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setTelaAtual('jogress')}><Text style={styles.navText}>JOGRESS</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {telaAtual === 'lista' ? (
          <View style={styles.padding}>
            <Text style={styles.header}>GUIA DE CAMPO: TIME STRANGER</Text>
            
            <View style={styles.destaque}>
              <Image source={{ uri: selecionado.img }} style={styles.imgDestaque} />
              <Text style={styles.nomeDestaque}>{selecionado.nome}</Text>
              <Text style={styles.descDestaque}>{selecionado.desc}</Text>
            </View>

            <Text style={styles.sub}>LISTA DE REGISTROS</Text>
            <FlatList
              data={DIGIDATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.miniCard} onPress={() => setSelecionado(item)}>
                  <Image source={{ uri: item.img }} style={styles.miniImg} />
                  <Text style={styles.miniName}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View style={styles.padding}>
            <Text style={styles.header}>CONFIGURAÇÃO DE FUSÃO</Text>
            
            <View style={styles.formCard}>
              <TextInput style={styles.input} placeholder="Digimon 1" value={digimon1} onChangeText={setDigimon1} />
  
              {/* MENU DO DIGIMON 1 */}
              <View style={{ backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 }}>
                <Picker selectedValue={rota1} onValueChange={setRota1}>
                  <Picker.Item label="Rota Agumon (WarGreymon)" value="Vacina" />
                  <Picker.Item label="Rota Angewomon -> Ofanimon" value="Ang_Ofani" />
                  <Picker.Item label="Rota Angewomon -> Holydramon" value="Ang_Holy" />
                  <Picker.Item label="Rota Patamon (Seraphimon)" value="VacinaPata" />
                  <Picker.Item label="Rota Coronamon -> Agnimon" value="Coro_Fogo" />
                  <Picker.Item label="Rota Coronamon -> Apollomon" value="Coro_Apollo" />
                </Picker>
              </View>

              <TextInput style={styles.input} placeholder="Digimon 2" value={digimon2} onChangeText={setDigimon2} />

              {/* MENU DO DIGIMON 2 */}
              <View style={{ backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 }}>
                <Picker selectedValue={rota2} onValueChange={setRota2}>
                  <Picker.Item label="Rota Gabumon (MetalGarurumon)" value="Data" />
                  <Picker.Item label="Rota LadyDevimon -> Lilithmon" value="Lady_Lilith" />
                  <Picker.Item label="Rota LadyDevimon -> BeelStarmon" value="Lady_Beel" />
                  <Picker.Item label="Rota Kudamon (MagnaGarurumon)" value="Kuda_Luz" />
                  <Picker.Item label="Rota Guilmon (Dukemon)" value="VirusGuil" />
                  <Picker.Item label="Rota Lunamon (Dianamon)" value="DataLuna" />
                </Picker>
              </View>

              <TextInput style={styles.input} placeholder="IP Servidor" value={servidor} onChangeText={setServidor} />
              <TextInput style={styles.input} placeholder="Código" value={codigo} onChangeText={setCodigo} secureTextEntry />
            </View>

            <Text style={[styles.sub, {marginTop: 20, textAlign: 'center'}]}>SINCRONIZAÇÃO DE EVOLUÇÃO</Text>

            {/* A MÁGICA ACONTECE AQUI: Se a Jogress foi feita, mostra Omegamon. Se não, mostra os cards normais. */}
            {jogressFeita ? (
              <View style={styles.omegamonContainer}>
                <Image source={{ uri: jogressFeita.img }} style={styles.omegamonImg} />
                <Text style={styles.omegamonTitle}>{jogressFeita.nome} NASCEU!</Text>
                <Text style={styles.descDestaque}>{jogressFeita.desc}</Text>
              </View>
            ) : (
              <View>
                <View style={styles.evoCard}>
                  <Image source={{ uri: digiTamer1.img }} style={styles.evoImg} />
                  <View style={styles.evoControls}>
                    <Text style={styles.syncText}>{digimon1 || 'Digimon 1'} - {digiTamer1.nome} ({Math.floor(sync1)}%)</Text>
                    <Slider style={styles.slider} minimumValue={0} maximumValue={100} value={sync1} onValueChange={setSync1} minimumTrackTintColor="#ff6b6b" />
                    <View style={styles.switchRow}>
                      <Text style={styles.switchLabel}>Preparo Concluído</Text>
                      <Switch value={pronto1} onValueChange={setPronto1} trackColor={{ false: "#767577", true: "#ff6b6b" }} />
                    </View>
                  </View>
                </View>

                <View style={styles.evoCard}>
                  <Image source={{ uri: digiTamer2.img }} style={styles.evoImg} />
                  <View style={styles.evoControls}>
                    <Text style={styles.syncText}>{digimon2 || 'Digimon 2'} - {digiTamer2.nome} ({Math.floor(sync2)}%)</Text>
                    <Slider style={styles.slider} minimumValue={0} maximumValue={100} value={sync2} onValueChange={setSync2} minimumTrackTintColor="#00d4ff" />
                    <View style={styles.switchRow}>
                      <Text style={styles.switchLabel}>Preparo Concluído</Text>
                      <Switch value={pronto2} onValueChange={setPronto2} trackColor={{ false: "#767577", true: "#00d4ff" }} />
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Oculta o botão de executar se a fusão já estiver na tela */}
            {!jogressFeita && (
            <TouchableOpacity 
              style={[styles.btn, fusaoPronta ? styles.btnOmegamon : null]} 
              onPress={() => {
                // 1º: Testa as fusões com nomes específicos (Mais difíceis)
                if (isSusanoomon) {
                  setJogressFeita(susanooData);
                } else if (isGraceNovamon) {
                  setJogressFeita(graceNovaData);
                } else if (isMastemon) {
                  setJogressFeita(mastemonData);
                } 
                // 2º: Se não for nenhuma das acima, mas estiver em 100%, vira Omegamon
                else if (isOmegamon) {
                  setJogressFeita(omegamonData); 
                } else {
                  Alert.alert("Sincronia Insuficiente", "Os dados de rede estão corretos, mas os Digimons ainda não estão prontos.");
                }
              }}
            >
              <Text style={styles.btnText}>{fusaoPronta ? "EXECUTAR JOGRESS!" : "INICIAR JOGRESS"}</Text>
            </TouchableOpacity>
          )}
          
          {/* O BOTÃO DE RESETAR QUE JÁ EXISTE VEM LOGO ABAIXO */}
          <TouchableOpacity 
            style={[styles.btn, {backgroundColor: 'red', marginTop: 10}]} 
            onPress={resetar}
          >
            <Text style={[styles.btnText, {color: '#fff'}]}>CANCELAR / RESETAR</Text>
          </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000814' },
  padding: { padding: 20 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#001d3d', padding: 15 },
  navText: { color: '#00d4ff', fontWeight: 'bold' },
  header: { color: '#00d4ff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  destaque: { backgroundColor: '#001d3d', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 20 },
  imgDestaque: { width: 150, height: 150, marginBottom: 10, borderRadius: 10, backgroundColor: '#fff' },
  nomeDestaque: { color: '#ffc300', fontSize: 24, fontWeight: 'bold' },
  descDestaque: { color: '#fff', textAlign: 'justify', marginTop: 10, lineHeight: 20 },
  sub: { color: '#00d4ff', marginBottom: 10, fontWeight: 'bold' },
  miniCard: { marginRight: 15, alignItems: 'center' },
  miniImg: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: '#00d4ff', backgroundColor: '#fff' },
  miniName: { color: '#fff', fontSize: 10, marginTop: 5 },
  formCard: { backgroundColor: '#001d3d', padding: 15, borderRadius: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  
  evoCard: { flexDirection: 'row', backgroundColor: '#001d3d', padding: 15, borderRadius: 15, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#003566' },
  evoImg: { width: 80, height: 80, borderRadius: 10, marginRight: 15, backgroundColor: '#fff' },
  evoControls: { flex: 1 },
  syncText: { color: '#ffc300', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  slider: { width: '100%', height: 40 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -5 },
  switchLabel: { color: '#fff', fontSize: 12 },
  
  btn: { backgroundColor: '#00d4ff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  btnOmegamon: { backgroundColor: '#ffc300', shadowColor: '#ffc300', shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 10, elevation: 10 },
  btnText: { fontWeight: 'bold', color: '#000' },

  // NOVOS ESTILOS DO OMEGAMON
  omegamonContainer: { backgroundColor: '#001d3d', padding: 30, borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#ffc300', shadowColor: '#ffc300', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 10, marginBottom: 20 },
  omegamonImg: { width: 200, height: 200, borderRadius: 10, marginBottom: 15, backgroundColor: '#fff' },
  omegamonTitle: { color: '#ffc300', fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase' }
});