export default (req, res)=> {
    console.log(req)
    res.status(200).end({ name: 'John Doe' })
}