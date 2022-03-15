// import '@testing-library/jest-dom/extend-expect';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useCountdown from '../useCountdown';

afterEach(() => {
  cleanup();
});

const delay = (time = 1100) => {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    }, time);
  })
}

describe('useCountdown', () => {
  const MIN = 1000 * 60;
  
  test('should be defined', () => {
    expect(useCountdown).toBeDefined();
  });
  
  test('should render correct',  () => {
    const endTime = Date.now() + (10 * MIN);
    const { result } = renderHook(() => useCountdown(endTime));
    expect(result.current.value).toBeDefined();
    expect(typeof result.current.onStart).toBe('function');
    expect(typeof result.current.onStop).toBe('function');
    expect(result.current.isActive).toBeTruthy();
  });  

  
  test('should render correct countdown 10 second', async () => {
    const endTime = Date.now() + (10  * 1000);
    const { result } = renderHook(() => useCountdown(endTime));
    expect(result.current.value).toBe('00:00:00:10');
    await delay();
    expect(result.current.value).toBe('00:00:00:09');
  });

  test('should render correct countdown 1 day', async () => {    
    const endTime = Date.now() + (1000 * 60 * 60 * 24 * 2);
    const { result } = renderHook(() => useCountdown(endTime));
    await delay();
    expect(result.current.value).toBe('01:23:59:59');
  });

  test('should get timeup when endDate expired', () => {    
    const endTime = Date.now() - (10  * 1000);
    const { result } = renderHook(() => useCountdown(endTime));
    expect(result.current.value).toBe('timeup');
  });

  test('should stop countdown when trigger onStop', async () => {    
    const endTime = Date.now() + (10  * 1000);
    const { result, waitForNextUpdate} = renderHook(() => useCountdown(endTime));
    await waitForNextUpdate();
    await act(()=> {
      result.current.onStop();
    })    
    expect(result.current.value).toBe('00:00:00:09');
    expect(result.current.isActive).toBeFalsy();
  });
  
})