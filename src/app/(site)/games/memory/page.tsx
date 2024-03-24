'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MemoryList } from '@/components/ui/MemoryList'

const CardDataRelevant = [
    "relevant1",
    "relevant2",
    "relevant3",
    "relevant4",
    "relevant5",
    "relevant6",
    "relevant7",
    "relevant8",

]

const CardDataIrrelevant = [
    "irrelevant1",
    "irrelevant2",
    "irrelevant3",
    "irrelevant4",
    "irrelevant5",
    "irrelevant6",
    "irrelevant7",
    "irrelevant8",


]


const page = () => {
    function shuffle(array: string[]) {
        return array.sort(() => Math.random() - 0.5);
      }
    var array = [...CardDataRelevant, ...CardDataIrrelevant];
    var array2 = [...CardDataRelevant, ...CardDataIrrelevant];
    const shuffledData = shuffle(array);
    const shuffledData2 = shuffle(array2);
    return (
        <div className='w-full min-h-[85vh] mt-2 max-w-screen flex flex-col md:flex-row overflow-hidden justify-start md:justify-center items-center'>
            <div className='h-full overflow-hidden text-gray-300 w-full md:w-1/3'>
                <h2 className='p-2 font-bold text-gray-300'>Select the <span className='text-indigo-600'>lesson-relevant</span> expressions from the flashcards in the checkboxes below:</h2>
                <div className=''>
                    <MemoryList items={shuffledData2}/>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-2 p-2'>
                {shuffledData.map((content, index) => (
                    <Card key={index} content={content}/>
                ))}
            </div>
        </div>
    );
}

export default page

const Card = ({content}: {content: string}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleFlip() {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    }
    
    return (
        <div className="flex flex-wrap aspect-square items-center justify-center h-[80px] md:h-[100px] lg:h-[150px] cursor-pointer hover:scale-105 ease-in-out duration-300">
            <motion.div
            key={"flip-card"}
            exit={{ opacity:0 }}
            initial={{ opacity:1 }}
            animate={isFlipped && { opacity:0, display:"none", cursor:"default" }}
            transition={{ duration: 0.8 }}
            className={`flip-card aspect-square h-[80px] md:h-[100px] lg:h-[150px] rounded-md ${isFlipped ? "transform duration-1000 opacity-100" : ""}`} onClick={handleFlip}>
                <motion.div className="flip-card-inner w-[100%] h-[100%] rounded-md" initial={false} animate={{ rotateY: isFlipped ? 180 : 360 }} transition={{ duration: 0.1, animationDirection: "normal" }} onAnimationComplete={() => setIsAnimating(false)}>
                    <FlipcardFront/>
                    <FlipcardBack content={content} />
                </motion.div>
            </motion.div>
        </div>
    )
}

function FlipcardFront() {
    return (
        <div className='flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-gray-300 rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-between overflow-hidden'/>
    )
}

function FlipcardBack({content}: {content: string}) {
    return (
    <div className={`flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-gray-300 sm:text-sm rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-center items-center ${CardDataRelevant.includes(content) ? "bg-gradient-to-tr from-black to-blue-800" : ""}`}>
        <p>{content}</p>
    </div>
    )
}
