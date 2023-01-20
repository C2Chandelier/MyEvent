<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SortieRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: SortieRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['owner_id' => 'exact'])]
#[ApiResource(paginationEnabled: false)]
class Sortie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('sortiesParticipants')]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups('sortiesParticipants')]
    private ?string $event_id = null;

    #[ORM\ManyToOne]
    #[Groups('sortiesParticipants')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner_id = null;

    #[ORM\Column]
    #[Groups('sortiesParticipants')]
    private ?bool $visibility = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEventId(): ?string
    {
        return $this->event_id;
    }

    public function setEventId(string $event_id): self
    {
        $this->event_id = $event_id;

        return $this;
    }

    public function getOwnerId(): ?User
    {
        return $this->owner_id;
    }

    public function setOwnerId(?User $owner_id): self
    {
        $this->owner_id = $owner_id;

        return $this;
    }

    public function isVisibility(): ?bool
    {
        return $this->visibility;
    }

    public function setVisibility(bool $visibility): self
    {
        $this->visibility = $visibility;

        return $this;
    }
}
