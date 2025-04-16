function randomNum(num) {
    return Math.floor(Math.random() * num);
}

class Pet {
    constructor(name, type, age) {
        const names = ['뽀삐', '나비', '햄토리', '얼룩이', '점박이', '바둑이', '피카츄', '파이리', '꼬부기', '버터풀', '피죤투']
        const types = ['Dog', 'Cat', 'Hamster', 'Monkey']

        this.name = names[randomNum(names.length)];
        this.type = types[randomNum(types.length)];
        this.age = parseFloat((Math.random() * 3).toFixed(1));
        this.energy = 50;
		this.hunger = 50;
    }
    getInfo(){
        return `[${this.type}] ${this.name}\n${this.name}(은/는) / 종류 ${this.type} / 나이 : ${this.age}살 / 에너지 : ${this.energy} / 배고픔 : ${this.hunger}`
    }
    eat() {
        this.energy += 10;
        this.hunger -= 30;
    }
    play() {
        this.energy -= 20;
        this.hunger += 20;
        // this.age += 0.1; 부동 소수점 연산의 부정확성 때문에 나이가 정확하게 증가하지 않는 경우 발생
        this.age = parseFloat((this.age + 0.1).toFixed(1)) // 함정이 있었다...
    }
    sleep() {
        this.energy += 40;
        this.hunger += 10;
    }
}
class Dog extends Pet {
    speak() {
        return '🐶 멍!멍!'
    }
}
class Cat extends Pet {
    speak() {
        return '🐈 야옹~'
    }
}
class Hamster extends Pet {
    speak() {
        return '🐹 찍찍찍찍'
    }
}
class Monkey extends Pet {
    speak() {
        return '🐒 우우앜앜앜앜'
    }
}
class PetManager {
    constructor() {
        this.pets = [];
        this.dayCount = 0;
    }
    addPet(pet) {
        this.pets.push(pet)
        console.log(`${pet.name} (${pet.type})이(가) 목록에 추가되었습니다.`);
    }
    simulateDay() {
        this.dayCount++;
        console.log(`============= Day ${this.dayCount} =============`);
        for (let i = 0; i < this.pets.length; i++) {
            const actions = ['eat', 'play', 'sleep'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const pet = this.pets[i];

            switch (randomAction) {
                case 'eat':
                    pet.eat();
                    console.log(`${pet.name}(은/는) 🍔 eat()을 했습니다.`);
                    break;
                case 'play':
                    pet.play();
                    console.log(`${pet.name}(은/는) 🛼 play()을 했습니다.`);
                    break;
                case 'sleep':
                    pet.sleep();
                    console.log(`${pet.name}(은/는) 💤 sleep()을 했습니다.`);
                    break;
            }
            this.limitPetStatus(pet);
            console.log(pet.getInfo());
            console.log('-------------------------');
        }
    }
    limitPetStatus(pet) {
        pet.energy = Math.max(0, Math.min(100, pet.energy));
        pet.hunger = Math.max(0, Math.min(100, pet.hunger));
        pet.age = parseFloat(pet.age.toFixed(1));
    }
    showAllPets() {
        console.log('--- 전체 펫 목록 ---');
        for (let i = 0; i < this.pets.length; i++ ) {
            const pet = this.pets[i];
            console.log(pet.getInfo());
        }
        console.log('=====================');
    }
}

// 테스트트
const petManager = new PetManager();
const numberOfPets = randomNum(3) + 3;
const numberOfDays = randomNum(3) + 3;
for (let i = 0; i < numberOfPets; i++) {
    const randomPetIndex = randomNum(4);
    let newPet;
    switch (randomPetIndex) {
        case 0:
            newPet = new Dog();
            break;
        case 1:
            newPet = new Cat();
            break;
        case 2:
            newPet = new Hamster();
            break;
        case 3:
            newPet = new Monkey();
            break;
    }
    petManager.addPet(newPet);
}
for (let i = 0; i < numberOfDays; i++) {
    petManager.simulateDay();
}
petManager.showAllPets();