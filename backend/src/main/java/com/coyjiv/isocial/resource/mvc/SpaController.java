package com.coyjiv.isocial.resource.mvc;

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
    "/chats",
    "/chats/*",
    "/search",
    "/feed",
    "/settings",
    "/friends",
    "/friends/*",
    "/watch",
    "/groups",
    "/confirmation",
    "/saved",
    "/post/*",
    })
  public String redirect() {
    return "forward:/index.html";
  }
}