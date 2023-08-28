// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo>

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)
// step 1 :
/* ภาพรวมเกม find your hat : เป็นเกมที่ให้ผู้เล่นเดินทางในสนามหญ้าไปด้านซ้าย ขวา บน ล่าง เพื่อตามหาหมวก(hat)โดยระหว่างทางอาจมีหลุม(hole)ขวางอยู่ผู้เล่นจึงต้องเลือกเส้นทางเดินในการหลบหลุม หากเจอหลุม ผู้เล่นจะแพ้และทางเกมจะแสดงข้อความแจ้งให้ผู้เล่นทราบว่าผู้เล่นแพ้ และหากผู้เล่นเจอหมวก(hat) ผู้เล่นจะชนะและทางเกมจะแสดงข้อความแจ้งให้ผู้เล่นทราบว่าผู้เล่นชนะ
 1.กำหนดตัวแปร prompt เพื่อให้เล่นผ่าน Node 
 2.กำหนดตัวแปร hat คือสัญลักษณ์หมวก ,กำหนดตัวแปร hole คือสัญลักษณ์หลุม,กำหนดตัวแปร fieldCharacter คือสัญลักษณ์ของสนามหญ้าที่จะนำมาเรียงต่อกัน,กำหนดตัวแปร pathCharacter คือสัญลักษณ์ของผู้เล่น */



// JS Assessment: Find your hat //

const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
// const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '👒';
const hole = '🔺';
const fieldCharacter = '◽️';
const pathCharacter = '😺';
const clear = require("clear-screen");

class Field {
  constructor(field = [[]]) {
    // กำหนดตำแหน่งของสนามหญ้าโดย แนวแกน x = 0, แนวแกน y = 0
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;


    this.field[0][0] = pathCharacter;    // กำหนดตำแหน่งของ pathCharacter ให้อยู่ที่ตำแหน่ง x=0,y=0
    this.field[5][5] = hat;     // กำหนดตำแหน่งของ hat ให้อยู่ที่ตำแหน่ง x=5,y=5
  };

  static generateField(height, width, percentage = 0.1){
    const field = new Array(height).fill(0).map(e => new Array(width));
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole
        }
    }
    return field;
    
  }
//   ฟังก์ชั่น playGame() แสดงเงื่อนไขในการเล่น
    playGame(){
        let playing = true;
        while(playing){
            this.print();
            this.ask();
        // ถ้าไม่ได้อยู่ในสนามหญ้า ให้แพ้และหยุดเกม
            if(!this.isInMaps()){
                console.log('You are out of the map.')
                playing = false;
                break;
        // ถ้าเจอหลุม ให้แพ้หยุดเกม        
            }else if(this.isHole()){
                console.log('You are LOSE.');
                playing = false;
                break;
         // ถ้าเจอหมวก ให้ชนะและหยุดเกม         
            }else if(this.isHat()){
                console.log('You are win!')
                playing = false;
                break;
            }
            this.field[this.positionY][this.positionX] = pathCharacter
        }
    }

// ฟังก์ชั่น ask() เพื่อถามว่าผู้เล่นว่าจะเดินไปทางไหน
  ask() {
    const answer = prompt('Which way ?').toUpperCase(); // กำหนด.toUpperCase() เปลี่ยนตัวอักษรภาษาอังกฤษพิมพ์เล็กให้เป็นตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ เพื่อในกรณีที่ผู้เล่นกรอกตัวอักษรภาษาอังกฤษพิมพ์เล็กเข้ามา จะทำให้ตรงตาม case ต่างๆที่กำหนดไว้
// กำหนดเส้นทางที่ผู้เล่นจะเดิน
    switch(answer) {
        // 'W' คือเดินไปข้างบน
        case 'W':
            this.positionY -= 1;
            break;
        // 'S' คือเดินไปข้างล่าง
        case 'S':
            this.positionY += 1;
            break;
        // 'A' คือเดินไปด้านซ้าย
        case 'A':
            this.positionX -=1;
            break;
        // 'D' คือเดินไปด้านขวา
        case 'D':
            this.positionX +=1 ;
            break;
        // ค่าเริ่มต้นจะแสดงเมื่อผู้เล่นพิมพ์ตัวอักษรต่างไปจากW S A D  และจำทำงาน ฟังก์ชั่น ask()อีกครั้ง
        default:
            console.log('Enter W S A D');
            this.ask();
            break;
    }
  }
  //ฟังก์ชั่น isInMaps() เพื่อเช็คว่าผู้เล่นอยู่ใน map หรือไม่
  isInMaps(){
    return (
        this.positionY >= 0 &&
        this.positionX >= 0 &&
        this.positionY < this.field.length &&
        this.positionX < this.field[0].length
    );
  }
// ฟังก์ชั่น isHat() เพื่อเช็คว่าตำแหน่งของผู้เล่นอยู่ตรงกับ hat หรือไม่
  isHat(){
    return this.field[this.positionY][this.positionX] === hat;
  }
// ฟังก์ชั่น isHole() เพื่อเช็คว่าตำแหน่งของผู้เล่นอยู่ตรงกับ hole หรือไม่
  isHole(){
    return this.field[this.positionY][this.positionX] === hole;
  }



  //print field method to make it eaier 
  print() {
      // your print map code here
clear();
// กำหนดให้นำสมาชิกของ field ออกมาใช้ และ join ระหว่าง array
    this.field.forEach(element => console.log(element.join('')))
  }        
}
// กำหนด class ใหม่โดยสืบทอดจาก class Field
const myField = new Field(Field.generateField(10, 10, 0.2));
// เรียกใช้ฟังก์ชั่น playGame() ผ่าน myField
myField.playGame();