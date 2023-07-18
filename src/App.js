import logo from './logo.svg';
import './App.css';
import { Canvas, useFrame,useThree } from '@react-three/fiber'
import {Box,CameraControls,Html, Cloud,Environment,Stars,useGLTF,OrbitControls} from '@react-three/drei'
import { Bloom, DepthOfField, SSAO,EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { Suspense,useState, useRef } from 'react';
import { KernelSize, BlendFunction } from 'postprocessing'
import * as THREE from 'three';


function Effects() {
  const ref = useRef()
  useFrame((state) => {
    // Disable SSAO on regress
    ref.current.blendMode.setBlendFunction( BlendFunction.MULTIPLY)
  }, [])
  return (

    <EffectComposer >
      <SSAO ref={ref}  intensity={4.6} radius={0.1} luminanceInfluence={0} bias={0.035} />

    <Bloom mipmapBlur luminanceThreshold={0.23} luminanceSmoothing={0.85} height={300} />
  </EffectComposer>

  )
}

function UpdateBtn(e){

 

  if(e.target.classList.contains('active-btn') == true){

    document.querySelectorAll(`.${e.target.id}`).forEach((element) =>{
        element.style.display = 'none'
   })
   
 }

 else {

  document.querySelectorAll(`.${e.target.id}`).forEach((element) =>{
    element.style.display = 'Block'
})
 
 }
    
    e.target.classList.toggle('active-btn')

}



function MyCamera(){
  const ref = useRef()

  const {scene} = useThree()

  document.querySelector('.reset-camera-btn').addEventListener('click', () =>{
    document.querySelector('.reset-camera-btn').classList.remove('camera-btn-active')


    ref.current.reset( true )
    ref.current.minDistance = 22
    ref.current.maxDistance = 68

    document.querySelector('.point1').style.display = 'none'
    document.querySelector('.point2').style.display = 'none'
    document.querySelector('.point3').style.display = 'none'
    document.querySelector('.point4').style.display = 'none'
    document.querySelector('.point5').style.display = 'none'

  })


  setTimeout(() =>{

    
  document.querySelectorAll('.popup-close-btn').forEach((el,i) =>{
    el.addEventListener('click',() =>{

     
      document.querySelector('.point1').style.display = 'none'
      document.querySelector('.point2').style.display = 'none'
      document.querySelector('.point3').style.display = 'none'
      document.querySelector('.point4').style.display = 'none'
      document.querySelector('.point5').style.display = 'none'
    })
  })


    document.getElementById('point1').addEventListener('click', (e) =>{

      document.querySelector(`.${e.target.id}`).style.display = 'flex'


      ref.current.minDistance = 5
      ref.current.maxDistance = 7

      document.querySelector('.reset-camera-btn').classList.add('camera-btn-active')

      setTimeout(() =>{
        ref.current.fitToBox( scene.getObjectByName('point1'), true,  {paddingLeft: 2, paddingRight: 2, paddingBottom: 2, paddingTop: 2 } )
      },200)
    })

    document.getElementById('point2').addEventListener('click', (e) =>{

      document.querySelector(`.${e.target.id}`).style.display = 'flex'


      document.querySelector('.reset-camera-btn').classList.add('camera-btn-active')
      
      ref.current.minDistance = 5
      ref.current.maxDistance = 7

      setTimeout(() =>{
        ref.current.fitToBox( scene.getObjectByName('point2'), true,  {paddingLeft: 2, paddingRight: 2, paddingBottom: 2, paddingTop: 2 } )
      },200)
    })

    document.getElementById('point3').addEventListener('click', (e) =>{

      document.querySelector(`.${e.target.id}`).style.display = 'flex'


      document.querySelector('.reset-camera-btn').classList.add('camera-btn-active')

      ref.current.minDistance = 5
      ref.current.maxDistance = 7


      setTimeout(() =>{
        ref.current.fitToBox( scene.getObjectByName('point3'), true,  {paddingLeft: 2, paddingRight: 2, paddingBottom: 2, paddingTop: 2 } )
      },200)
    })

    document.getElementById('point4').addEventListener('click', (e) =>{

      document.querySelector(`.${e.target.id}`).style.display = 'flex'


      document.querySelector('.reset-camera-btn').classList.add('camera-btn-active')

      ref.current.minDistance = 5
      ref.current.maxDistance = 7

      setTimeout(() =>{
        ref.current.fitToBox( scene.getObjectByName('point4'), true,  {paddingLeft: 2, paddingRight: 2, paddingBottom: 2, paddingTop: 2 } )
      },200)
    })
    
    document.getElementById('point5').addEventListener('click', (e) =>{

        document.querySelector(`.${e.target.id}`).style.display = 'flex'

      document.querySelector('.reset-camera-btn').classList.add('camera-btn-active')
     
      ref.current.minDistance = 5
      ref.current.maxDistance = 7

      setTimeout(() =>{
        ref.current.fitToBox( scene.getObjectByName('point5'), true,  {paddingLeft: 2, paddingRight: 2, paddingBottom: 2, paddingTop: 2 } )
      },200)
    })
     
  },1000)


 
  return  <CameraControls ref={ref} minDistance={22} maxDistance={68} maxPolarAngle={Math.PI / 2.08}/>

}

function Markers(){
   
 return <>
 <Html occlude distanceFactor={3.5} position={[-8.1,2.1,8.1]}  >
       
       <img className='anno metal-anno' id="point1" src="anno.svg"/>
      </Html>

      <Html occlude distanceFactor={3.5} position={[-7.4,3.64,7.56]}  >

       <img className='anno glass-anno' id="point2" src="anno-2.svg"/>
      </Html>

      <Html occlude distanceFactor={3.5} position={[-4.4,2.65,15.5]}  >
    
       <img className='anno plastic-anno' id="point3" src="anno-4.svg"/>
      </Html>

      <Html occlude distanceFactor={3.5} position={[-13.55,2.18,8.7]}  >
 
       <img className='anno paper-anno' id="point4" src="anno-3.svg"/>
      </Html>

      <Html occlude distanceFactor={3.5} position={[-18.5,2.15,11.5]}  >
    
       <img className='anno glass-anno' id="point5" src="anno-2.svg"/>
      </Html>
 </>

}

function App() {

   const {nodes} = useGLTF('Model.glb')
   

  return (

    <div className="main-container">

     <img className='color-bg' src="Top_Bar.svg" />

    <div className="menu">
      <h1 className="Menu-text">Menu</h1>
      <button className="paper-btn active-btn" id="paper-anno" onClick={(e) => UpdateBtn(e)}>Paper</button>
      <button className="glass-btn active-btn" id="glass-anno" onClick={(e) => UpdateBtn(e)}>Glass</button>
      <button className="plastic-btn active-btn" id="plastic-anno" onClick={(e) => UpdateBtn(e)}>Plastic</button>
      <button className="Metal-btn active-btn" id="metal-anno" onClick={(e) => UpdateBtn(e)}>Metal</button>
      <button className="Bio-waste-btn active-btn" >Bio Waste</button>
      <button className="Eco-Zones-btn active-btn" >Eco Zones</button>
      <button className="Other-Waste-btn active-btn" >Other Waste</button>
      <button className="Eco-report-btn active-btn" >Eco Report</button>

    </div>
    


    <div className='canvas-container'>

    <div className='reset-camera-btn'>
    <i class="bi bi-x"></i>
    </div>

     <img className="logo" src='my_logo.svg'/>

    <div class="popup-custom point1">
      <i class="popup-close-btn bi bi-x"></i>
      <h1>Tag 1</h1>
      <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"/>
      <p class="text-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      </p>

      <a href={'https://www.youtube.com/'} target='_blank'><button>Open Link</button></a>
    </div>

    <div class="popup-custom point2">
      <i class="popup-close-btn bi bi-x"></i>
      <h1>Tag 2</h1>
      <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"/>
      <p class="text-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      </p>

      <a href={'https://www.youtube.com/'} target='_blank'><button>Open Link</button></a>
    </div>

    <div class="popup-custom point3">
      <i class="popup-close-btn bi bi-x"></i>
      <h1>Tag 3</h1>
      <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"/>
      <p class="text-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      </p>

      <a href={'https://www.youtube.com/'} target='_blank'><button>Open Link</button></a>
    </div>

    <div class="popup-custom point4">
      <i class="popup-close-btn bi bi-x"></i>
      <h1>Tag 4</h1>
      <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"/>
      <p class="text-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      </p>

      <a href={'https://www.youtube.com/'} target='_blank'><button>Open Link</button></a>
    </div>

    <div class="popup-custom point5">
      <i class="popup-close-btn bi bi-x"></i>
      <h1>Tag 5</h1>
      <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"/>
      <p class="text-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
      </p>

      <a href={'https://www.youtube.com/'} target='_blank'><button>Open Link</button></a>
    </div>

    <Canvas dpr={1.5} gl={{alpha: false}} camera={{ position: [0, 20, 50], fov: 55 }}>
      <color attach="background" args={['#CBCBCB']} />

        <primitive object={nodes.Scene} scale={[0.25,0.25,0.25]}/>

        <Suspense fallback={<ambientLight/>} >
        <Environment files={'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/scythian_tombs_2_1k.hdr'}  />

        </Suspense>

        <Box args={[0.5,0.5]} visible={false} position={[-7.8,1.49,8.55]} name="point1"/>
        <Box args={[0.5,0.5]} visible={false} position={[-7.25,2.4,7.7]} name="point2"/>
        <Box args={[0.5,0.5]} visible={false} position={[-4.4,1.8,15.5]} name="point3"/>
        <Box args={[0.5,0.5]} visible={false} position={[-13.45,1.55,9]} name="point4"/>
        <Box args={[0.5,0.5]} visible={false} position={[-18.5,1.4,11.5]} name="point5"/>

       <Suspense fallback={null}>
       <Markers/>
       </Suspense>
       

       <Effects/>
       <MyCamera/>

      </Canvas>
    </div>

  </div>

   
  );
}


export default App;
