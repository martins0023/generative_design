import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { CustomButton } from '../components';
import { 
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img 
              src='./logo.png'
              alt="logo"
              className="w-13 h-12 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden"/> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive pattern with OB's design brand-new 3D customization tool. 
                <strong>Unleash your imagination</strong>{" "} and define your own style.
              </p>

              <div className="grid grid-cols-2 bg-transparent ">
              <CustomButton 
                type="filled"
                title="Mockup"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />

              <a href='https://ob-designs.vercel.app/'>
                <CustomButton 
                  type="filled"
                  title="Create design"
                  onClick={() => "https://ob-designs.vercel.app/"}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                  
                />
              </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home