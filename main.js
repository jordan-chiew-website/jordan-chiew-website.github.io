window.onload = () => {
   const warningScreen = document.querySelector('#warningScreen')
   const continueButton = document.querySelector('#continueButton')
   const dropdownMenuButton = document.querySelector('#dropdownMenuButton')
   const dropdownMenu = document.querySelector('#dropdownMenu')
   const sectionsMenuButton = document.querySelector('#selectionsButton')
   const aboutMenuButton = document.querySelector('#aboutButton')
   const nextButton = document.querySelector('#nextButton')
   const previousButton = document.querySelector('#previousButton')
   const header = document.querySelector('#header h1')
   const sections = document.querySelectorAll('.outerContainer')
   const schoolAnswers = document.querySelectorAll('.schoolAnswer')
   const backgroundImageForSection2 = document.querySelectorAll('.backgroundImgSection2')
   const backgroundImageForSections = document.querySelectorAll('.backgroundImgSection')
   const imageForSection3 = document.querySelector('#imgSection3')
   const imageForSection4 = document.querySelector('#imgSection4')
   const aboutMenu = document.querySelector('#aboutMenu')
   const developerSections = document.querySelector('#developerSection')

   const isMobile = () => /Android|iPhone/i.test(navigator.userAgent) && navigator.maxTouchPoints > 0

   console.log(isMobile())

   if(isMobile())warningScreen.classList.add('show')

   const animationController = [
      () => {
         // For section 3 opening
         setTimeout(() => {
            backgroundImageForSections[0].classList.remove('hidden')
         }, 500);
         setTimeout(() => {
            sections[2].classList.add('shrink')
            setTimeout(() => {
               imageForSection3.classList.add('show')
               schoolAnswers[0].classList.remove('hidden')
            }, 300);
         }, 2000);
      },
      () => {
         // For section 4 opening
         setTimeout(() => {
            backgroundImageForSections[1].classList.remove('hidden')
         }, 500);
         setTimeout(() => {
            sections[3].classList.add('shrink')
            setTimeout(() => {
               imageForSection4.classList.add('show')
               schoolAnswers[1].classList.remove('hidden')
            }, 300);
         }, 2000);
      },
      () => {
         // For section 3 closing
         backgroundImageForSections[0].classList.add('hidden')
         backgroundImageForSections[1].classList.add('hidden')

         schoolAnswers[0].classList.add('hidden')

         sections[2].classList.remove('shrink')
         imageForSection3.classList.remove('show')
      },
      () => {
         // For section 4 closing
         backgroundImageForSections[0].classList.add('hidden')
         backgroundImageForSections[1].classList.add('hidden')

         schoolAnswers[1].classList.add('hidden')

         sections[3].classList.remove('shrink')
         imageForSection4.classList.remove('show')
      }
   ]

   let autoBackgroundSwitcherInterval = null
   let currentBackground = 0

   const backgroundSwitcher = index => {
      for(const background of backgroundImageForSection2)background.classList.add('hidden')

      backgroundImageForSection2[index].classList.remove('hidden')
   }

   const backgroundSwitcherInitializer = () => {
      sections[1].classList.add('shrink2')

      backgroundSwitcher(0)

      currentBackground = 0

      autoBackgroundSwitcherInterval = setInterval(() => {
         if(currentBackground === 1)currentBackground = 0
         else currentBackground++

         backgroundSwitcher(currentBackground)
      }, 10000)
   }

   const backgroundSwitcherDeinitializer = () => {
      sections[1].classList.remove('shrink2')

      clearInterval(autoBackgroundSwitcherInterval)
      for(const background of backgroundImageForSection2)background.classList.add('hidden')
   }

   const switchSectionsIncrement = index => {
      sections[index].classList.add('exit')
      sections[index + 1].classList.remove('starting')

      console.log(animationController[0])

      if(index === 0)backgroundSwitcherInitializer()
      if(index === 1){
         backgroundSwitcherDeinitializer()

         animationController[0]()
      }
      if(index === 2){
         animationController[2]()
         animationController[1]()
      }
      if(index === 3){
         animationController[3]()
      }
   }

   const switchSectionsDecrement = index => {
      sections[index].classList.add('starting')
      sections[index - 1].classList.remove('exit')

      if(index === 1)backgroundSwitcherDeinitializer()
      if(index === 2){
         backgroundSwitcherInitializer()

         animationController[2]()
      }
      else if(index === 3){
         animationController[3]()
         animationController[0]()
      }
      else if(index === 4){
         animationController[1]()
      }
   }

   continueButton.addEventListener('click', () => warningScreen.classList.remove('show'))

   setTimeout(() => {
      let iteration = 0

      const removeLetterFromHeader = setInterval(() => {
         iteration++
         const splitHeaderText = header.innerHTML.split('')
         splitHeaderText.shift()
         header.innerHTML = splitHeaderText.join('')
         if(iteration > 10)clearInterval(removeLetterFromHeader)
      }, 109);

   }, 2500);

   setTimeout(() => {
      dropdownMenuButton.classList.remove('opening')
      nextButton.classList.remove('hidden')
      nextButton.classList.add('show')
   }, 3500);

   let dropdownState = 0
   let currentPage = 0

   const dropdownMenuOpen = hasCloseClass => {
      if(hasCloseClass){
         dropdownMenuButton.classList.remove('close')
         dropdownMenu.classList.remove('close')
      }
      dropdownMenuButton.classList.add('show')
      dropdownMenu.classList.add('show')

      dropdownState = 1
   }

   const dropdownMenuClose = () => {
      dropdownMenuButton.classList.remove('show')
      dropdownMenu.classList.remove('show')
      dropdownMenuButton.classList.add('close')
      dropdownMenu.classList.add('close')

      setTimeout(() => {
         dropdownMenuButton.classList.remove('close')
         dropdownMenu.classList.remove('close')
      }, 1000);

      dropdownState = 0
   }

   const aboutButtonAction = () => {
      dropdownMenuClose()
      aboutMenu.classList.add('show')
      document.addEventListener('keydown', event => {
         if(event.key === 'Escape'){
            aboutMenu.classList.remove('show')
            aboutMenuButton.removeEventListener('click', aboutButtonAction)
         }
      })
   }

   dropdownMenuButton.addEventListener('click', event => {
      let openingStage = false
      let hasCloseClass = false

      for(const classes of event.target.classList){
         if(classes === 'opening')openingStage = true
         if(classes === 'close')hasCloseClass = true
      }

      if(openingStage)return

      if(dropdownState === 0){
         dropdownMenuOpen(hasCloseClass)

         aboutMenuButton.addEventListener('click', aboutButtonAction)

      }else{
         dropdownMenuClose()

         aboutMenuButton.removeEventListener('click', aboutButtonAction)
      }
   })

   nextButton.addEventListener('click', event => {
      if(currentPage > 3)return
      currentPage++

      switchSectionsIncrement(currentPage - 1)

      console.log(currentPage)

      if(currentPage > 0){
         previousButton.classList.remove('hidden')
         previousButton.classList.add('show')
      }

      if(currentPage > 3){
         nextButton.classList.add('hidden')
         nextButton.classList.remove('show')
      }
   })

   previousButton.addEventListener('click', event => {
      if(currentPage < 1)return
      currentPage--

      switchSectionsDecrement(currentPage + 1)

      console.log(currentPage)

      console.log('Previous button triggered.')

      if(currentPage < 1){
         previousButton.classList.add('hidden')
         previousButton.classList.remove('show')
      }

      if(currentPage < 4){
         nextButton.classList.remove('hidden')
         nextButton.classList.add('show')
      }
   })
}