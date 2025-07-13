
const Output = ({ output }) => {
  return (
    <div className='pt-2'>
        <h2 className='text-lg font-semibold text-gray-200'>Output</h2>
        <div className='bg-gray-900 text-green-400 p-4 rounded-lg font-mono whitespace-pre-wrap'>
          <pre>{output}</pre>
        </div>
    </div>
  )
//OUTPUT NOT DIFINED IN THE INTERVIEW FILE , so file will not run
// <Output output={output<-this is not defined btw} pls add in the interview.tsx />
export default Output



