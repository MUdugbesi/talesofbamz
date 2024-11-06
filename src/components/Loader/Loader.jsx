import { TailSpin, ThreeDots, Comment } from 'react-loader-spinner';
const Loader = ({ className, size, single, double, type, color }) => {
  return (
    <div className={className}>
      {double && (
        <>
          <TailSpin
            visible={true}
            height={size}
            width={size}
            color={color || 'white'}
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
          />
          <ThreeDots
            visible={true}
            height={size}
            width={size}
            color={color || '#4fa94d'}
            radius='9'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            wrapperClass=''
          />
        </>
      )}
      {type === 'spin' && (
        <TailSpin
          visible={true}
          height={size}
          width={size}
          color={color || 'white'}
          ariaLabel='tail-spin-loading'
          radius='1'
          wrapperStyle={{}}
          wrapperClass=''
        />
      )}
      
      {(single || type === 'dot') && (
        <ThreeDots
          visible={true}
          height={size}
          width={size}
          color={color || '#4fa94d'}
          radius='9'
          ariaLabel='three-dots-loading'
          wrapperStyle={{}}
          wrapperClass=''
        />
      )}
      {type === 'comment' && (
        <Comment
          visible={true}
          height={size}
          width={size}
          ariaLabel='comment-loading'
          wrapperStyle={{}}
          wrapperClass='comment-wrapper'
          color='#fff'
          backgroundColor={color || '#893167'}
        />
      )}
    </div>
  );
};

export default Loader;
