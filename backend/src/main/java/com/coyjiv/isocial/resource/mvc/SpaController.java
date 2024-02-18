package com.coyjiv.isocial.resource.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
  @RequestMapping(value = {
    "/",
    "/login",
    "/register",
    "/home",
    "/profile",
    "/profile/*",
    "/chat",
    "/chat/*",
    "/search",
    "/feed",
    "/settings",
    "/friends",
    "/watch",
    "/groups",
    "/confirmation"
    })
  public String redirect() {
    return "forward:/index.html";
  }
}