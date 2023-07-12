﻿using AutoMapper;
using MediatR;
using MediSearch.Core.Application.Dtos.Comment;
using MediSearch.Core.Application.Dtos.Replie;
using MediSearch.Core.Application.Interfaces.Repositories;
using MediSearch.Core.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediSearch.Core.Application.Features.Home.Queries.GetProduct
{
    public class GetProductQuery : IRequest<GetProductQueryResponse>
    {
        public string Id { get; set; }
    }

    public class GetProductQueryHandler : IRequestHandler<GetProductQuery, GetProductQueryResponse>
    {
        private readonly IProductRepository _productRepository;
        private readonly IAccountService _accountService;
        private readonly ICompanyRepository _companyRepository;
        private readonly ICompanyUserRepository _companyUserRepository;
        private readonly ICommentRepository _commentRepository;

        public GetProductQueryHandler(IProductRepository productRepository, IAccountService accountService, ICompanyRepository companyRepository, ICompanyUserRepository companyUserRepository, ICommentRepository commentRepository)
        {
            _productRepository = productRepository;
            _accountService = accountService;
            _companyRepository = companyRepository;
            _companyUserRepository = companyUserRepository;
            _commentRepository = commentRepository;
        }

        public async Task<GetProductQueryResponse> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            var result = await GetProductById(request.Id);

            return result;
        }

        public async Task<GetProductQueryResponse> GetProductById(string id)
        {
            List<CommentDTO> resultDTO = new();
            var products = await _productRepository.GetAllWithIncludeAsync(new List<string>() { "Company" });
            if (products == null)
            {
                return null;
            }

            GetProductQueryResponse response = products.Where(p => p.Id == id).Select(p => new GetProductQueryResponse()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Categories = p.Categories,
                Components = p.Components,
                Price = p.Price,
                Images = p.UrlImages,
                Available = p.Quantity > 0,
                NameCompany = p.Company.Name,
                Ceo = p.Company.Ceo,
                Address = p.Company.Address,
                Email = p.Company.Email,
                Facebook = p.Company.Facebook,
                Instagram = p.Company.Instagram,
                Logo = p.Company.UrlImage,
                Municipality = p.Company.Municipality,
                Phone = p.Company.Phone,
                Province = p.Company.Province,
                Twitter = p.Company.Twitter,
                WebSite = p.Company.WebSite
            }).FirstOrDefault();
            if(response == null)
            {
                return null;
            }

            var comments = await _commentRepository.GetCommentsByProduct(response.Id);

            if (comments != null && comments.Count != 0)
            {
                foreach (var item in comments)
                {
                    List<ReplieDTO> list = new();
                    string name = "";
                    var user = await _accountService.GetUsersById(item.UserId);
                    var result = await _companyUserRepository.GetByUserAsync(item.UserId);
                    if (result != null)
                    {
                        var company = await _companyRepository.GetByIdAsync(result.CompanyId);
                        name = company.Name;
                    }

                    CommentDTO comment = new CommentDTO();
                    comment.Id = item.Id;
                    comment.Content = item.Content;
                    comment.OwnerName = result == null ? $"{user.FirstName} {user.LastName}" : $"{user.FirstName} {user.LastName}({name})";
                    comment.OwnerImage = user.UrlImage;

                    
                    if(item.Replies != null && item.Replies.Count != 0)
                    {
                        foreach(var rep in item.Replies)
                        {
                            user = await _accountService.GetUsersById(rep.UserId);
                            result = await _companyUserRepository.GetByUserAsync(rep.UserId);
                            if (result != null)
                            {
                                var company = await _companyRepository.GetByIdAsync(result.CompanyId);
                                name = company.Name;
                            }

                            ReplieDTO dto = new();
                            dto.Id = rep.Id;
                            dto.Content = rep.Content;
                            dto.OwnerName = result == null ? $"{user.FirstName} {user.LastName}" : $"{user.FirstName} {user.LastName}({name})";
                            dto.OwnerImage = user.UrlImage;

                            list.Add(dto);
                        }
                    }
                    comment.Replies = list;

                    resultDTO.Add(comment);
                }
            }

            response.Comments = resultDTO;

            return response;
        }

    }
}
