const Table = ({ headers, body }) => {
    return (
        <table className='border border-collapse border-slate-500'>
            <thead>
                <tr>
                    {headers.map(header => <th className='border border-slate-800'>{header}</th>)}
                </tr>
            </thead>
            <tbody>
        {/* body prop is an array of arrays */}
        {body.map(col => {
            return (
                <tr>
            {col.map(row => {
                return (
                    <td className='border border-slate-800 px-2'>{row}</td>
                )
            })}
                </tr>
            )
        })}
            </tbody>
  
        </table>
    )
}

export default Table;