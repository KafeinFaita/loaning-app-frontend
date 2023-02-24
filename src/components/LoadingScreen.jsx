import { BallTriangle } from  'react-loader-spinner';

const LoadingScreen = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClassName="w-96"
                wrapperStyle=""
                visible={true}
            />
        </div>
    )
}

export default LoadingScreen;