//Frontend
useEffect(() => {
    loadOrders({ guestId: loggedInUser._id })

    socketService.on(SOCKET_EVENT_ORDER_UPDATED, order => {
        dispatch(getActionUpdateOrder(order))
    })

    return () => {
        socketService.off(SOCKET_EVENT_ORDER_UPDATED)
    }
}, [])


//Backend
export async function updateOrder(req, res) {

    try {
        var order = req.body
        order = await orderService.update(order)
        socketService.emitToUser({ type: 'order-updated', data: order, userId: order.guest._id })
        res.send(order)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(400).send({ err: 'Failed to update order' })
    }
}