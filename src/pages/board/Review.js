import React from 'react'
import ReviewCard from './components/ReviewCard'
import './Review.scss'

const MockData = [
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    },
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    },
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    },
    {
        title: '모더나 접종 후기글!',
        vaccine: '모더나',
        previewImage: '',
        contents: '모더나 1차 금요일 17시 접종 당시 컨디션 굉장히 피곤하네요...'
    }
]

const Review = () => {
  return (
    <div className='review-page'>
        {MockData.map((elem, index) => 
            <ReviewCard
                key={index}
                title={elem.title}
                vaccine={elem.vaccine}
                previewImage={elem.previewImage}
                contents={elem.contents}
            />
        )}
    </div>
  )
}

export default Review