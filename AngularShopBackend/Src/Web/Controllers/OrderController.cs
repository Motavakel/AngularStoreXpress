﻿using Application.Dtos.OrderDto;
using Application.Features.Orders.Commands.Create;
using Application.Features.Orders.Commands.Verify;
using Application.Features.Orders.Queries.GetDeliveryMethodById;
using Application.Features.Orders.Queries.GetDeliveryMethods;
using Application.Features.Orders.Queries.GetOrderById;
using Application.Features.Orders.Queries.GetOrdersForUser;
using Domain.Entities.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Common;

namespace Web.Controllers;

public class OrderController : BaseApiController
{
    [HttpPost("CreateOrder")]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderCommand request,
        CancellationToken cancellationToken)
    {
        var result = await Mediator.Send(request, cancellationToken);
        return result is null ? NotFound() : Ok(new { paymentUrl = result });
    }

    [HttpGet("GetOrdersForUser")]
    public async Task<ActionResult<List<OrderDto>>> GetOrdersForUser(CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new GetOrdersForUserQuery(), cancellationToken));
    }

    [HttpGet("GetOrderById/{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderById([FromRoute] int id,
        CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new GetOrderByIdQuery(id), cancellationToken));
    }

    [HttpGet("GetDeliveryMethods")]
    public async Task<ActionResult<List<DeliveryMethod>>> GetDeliveryMethods(CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new GetDeliveryMethodsQuery(), cancellationToken));
    }

    [HttpGet("GetDeliveryMethodById/{id:int}")]
    public async Task<ActionResult<DeliveryMethod>> GetDeliveryMethodById([FromRoute] int id,
        CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new GetDeliveryMethodByIdQuery(id), cancellationToken));
    }


    [HttpPost]
    [Route("Verify")]
    public async Task<IActionResult> VerifyNovinoPayment([FromBody] VerifyCommand command)
    {
        return Ok(await Mediator.Send(command));
    }

}